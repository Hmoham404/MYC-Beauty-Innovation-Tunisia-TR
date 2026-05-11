const fs = require('fs');
const JSZip = require('jszip');
const xml2js = require('xml2js');
const translationService = require('../translationService');

class WordSurgery {
    constructor() {
        this.parser = new xml2js.Parser();
        this.builder = new xml2js.Builder();
    }

    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[WordSurgery] Processing: ${inputPath}`);
        const zip = await this.loadZip(inputPath, 'DOCX');
        const zipEntries = Object.keys(zip.files)
            .filter(name => !zip.files[name].dir)
            .map(name => ({ entryName: name, file: zip.files[name] }));
        
        const targetEntries = zipEntries.filter(entry => 
            entry.entryName === 'word/document.xml' || 
            entry.entryName.startsWith('word/header') || 
            entry.entryName.startsWith('word/footer')
        );

        // 1. First pass: collect all unique texts to translate in batch
        const textsToTranslate = new Set();
        const parsedEntries = [];

        for (const entry of targetEntries) {
            const xmlContent = await entry.file.async('string');
            const json = await this.parser.parseStringPromise(xmlContent);
            parsedEntries.push({ entry, json });
            this.collectTexts(json, textsToTranslate);
        }

        // 2. Batch Translate
        const translationMap = await translationService.translateBatch([...textsToTranslate], targetLanguage);

        // 3. Second pass: replace and rebuild
        for (const { entry, json } of parsedEntries) {
            this.applyTranslations(json, translationMap);
            const rebuiltXml = this.builder.buildObject(json);
            zip.file(entry.entryName, rebuiltXml);
        }

        const outputBuffer = await zip.generateAsync({
            type: 'nodebuffer',
            compression: 'DEFLATE'
        });
        fs.writeFileSync(outputPath, outputBuffer);
        return outputPath;
    }

    async loadZip(inputPath, label) {
        try {
            const fileBuffer = fs.readFileSync(inputPath);
            return await JSZip.loadAsync(fileBuffer);
        } catch (error) {
            throw new Error(`${label} file cannot be opened. Please upload a valid, non-protected ${label} file exported from Microsoft Office or LibreOffice.`);
        }
    }

    collectTexts(node, textsSet) {
        if (typeof node !== 'object' || node === null) return;
        for (let key in node) {
            if (key === 'w:t') {
                const textArray = node[key];
                for (let val of textArray) {
                    const textValue = (typeof val === 'object' && val._) ? val._ : (typeof val === 'string' ? val : "");
                    if (textValue && textValue.trim().length > 0) textsSet.add(textValue);
                }
            } else if (Array.isArray(node[key])) {
                node[key].forEach(child => this.collectTexts(child, textsSet));
            } else {
                this.collectTexts(node[key], textsSet);
            }
        }
    }

    applyTranslations(node, translationMap) {
        if (typeof node !== 'object' || node === null) return;
        for (let key in node) {
            if (key === 'w:t') {
                const textArray = node[key];
                for (let i = 0; i < textArray.length; i++) {
                    const isObj = (typeof textArray[i] === 'object' && textArray[i]._);
                    const textValue = isObj ? textArray[i]._ : textArray[i];
                    
                    if (textValue && translationMap[textValue]) {
                        if (isObj) textArray[i]._ = translationMap[textValue];
                        else textArray[i] = translationMap[textValue];
                    }
                }
            } else if (Array.isArray(node[key])) {
                node[key].forEach(child => this.applyTranslations(child, translationMap));
            } else {
                this.applyTranslations(node[key], translationMap);
            }
        }
    }
}

module.exports = new WordSurgery();
