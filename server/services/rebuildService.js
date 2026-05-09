const AdmZip = require('adm-zip');
const ExcelJS = require('exceljs');
const translationService = require('./translationService');

class RebuildService {
    // Helper to escape XML characters
    xmlEscape(str) {
        if (!str) return "";
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    // Helper to unescape XML characters for translation
    xmlUnescape(str) {
        if (!str) return "";
        return str.toString()
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    }

    async rebuildDocx(inputPath, outputPath, targetLanguage) {
        console.log(`Rebuilding DOCX: ${inputPath}`);
        const zip = new AdmZip(inputPath);
        const zipEntries = zip.getEntries();
        
        // 1. Collect and Unescape texts
        const textMap = new Map(); // original escaped -> unescaped
        const xmlFiles = zipEntries.filter(e => 
            e.entryName === 'word/document.xml' || 
            e.entryName.startsWith('word/header') || 
            e.entryName.startsWith('word/footer')
        );

        for (const entry of xmlFiles) {
            const content = entry.getData().toString('utf8');
            const matches = content.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
            if (matches) {
                matches.forEach(m => {
                    const escapedText = m.match(/<w:t[^>]*>(.*?)<\/w:t>/)[1];
                    if (escapedText && escapedText.trim().length > 0) {
                        textMap.set(escapedText, this.xmlUnescape(escapedText));
                    }
                });
            }
        }

        if (textMap.size > 0) {
            const unescapedTexts = [...textMap.values()];
            const translatedMap = await translationService.translateBatch(unescapedTexts, targetLanguage);

            // 2. Apply translations
            for (const entry of xmlFiles) {
                let content = entry.getData().toString('utf8');
                const newContent = content.replace(/(<w:t[^>]*>)(.*?)(<\/w:t>)/g, (match, open, escapedText, close) => {
                    const unescaped = textMap.get(escapedText);
                    const translated = translatedMap[unescaped];
                    if (translated) {
                        return open + this.xmlEscape(translated) + close;
                    }
                    return match;
                });
                zip.updateFile(entry.entryName, Buffer.from(newContent, 'utf8'));
            }
        }
        
        zip.writeZip(outputPath);
        return outputPath;
    }

    async rebuildXlsx(inputPath, outputPath, targetLanguage) {
        console.log(`Rebuilding XLSX: ${inputPath}`);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputPath);

        const allTexts = new Set();
        workbook.eachSheet(sheet => {
            sheet.eachRow(row => {
                row.eachCell(cell => {
                    if (cell.type === ExcelJS.ValueType.String && cell.value && cell.value.trim().length > 0) {
                        allTexts.add(cell.value);
                    } else if (cell.type === ExcelJS.ValueType.RichText && cell.value.richText) {
                        cell.value.richText.forEach(part => {
                            if (part.text && part.text.trim().length > 0) allTexts.add(part.text);
                        });
                    }
                });
            });
        });

        if (allTexts.size > 0) {
            const translations = await translationService.translateBatch([...allTexts], targetLanguage);

            workbook.eachSheet(sheet => {
                sheet.eachRow(row => {
                    row.eachCell(cell => {
                        if (cell.type === ExcelJS.ValueType.String && translations[cell.value]) {
                            cell.value = translations[cell.value];
                        } else if (cell.type === ExcelJS.ValueType.RichText && cell.value.richText) {
                            cell.value.richText.forEach(part => {
                                if (translations[part.text]) part.text = translations[part.text];
                            });
                        }
                    });
                });
            });
        }

        await workbook.xlsx.writeFile(outputPath);
        return outputPath;
    }

    async rebuildPptx(inputPath, outputPath, targetLanguage) {
        console.log(`Rebuilding PPTX: ${inputPath}`);
        const zip = new AdmZip(inputPath);
        const zipEntries = zip.getEntries();
        
        const textMap = new Map();
        const slideFiles = zipEntries.filter(e => 
            e.entryName.startsWith('ppt/slides/slide') && e.entryName.endsWith('.xml')
        );

        for (const entry of slideFiles) {
            const content = entry.getData().toString('utf8');
            const matches = content.match(/<a:t[^>]*>(.*?)<\/a:t>/g);
            if (matches) {
                matches.forEach(m => {
                    const escapedText = m.match(/<a:t[^>]*>(.*?)<\/a:t>/)[1];
                    if (escapedText && escapedText.trim().length > 0) {
                        textMap.set(escapedText, this.xmlUnescape(escapedText));
                    }
                });
            }
        }

        if (textMap.size > 0) {
            const translatedMap = await translationService.translateBatch([...textMap.values()], targetLanguage);

            for (const entry of slideFiles) {
                let content = entry.getData().toString('utf8');
                const newContent = content.replace(/(<a:t[^>]*>)(.*?)(<\/a:t>)/g, (match, open, escapedText, close) => {
                    const unescaped = textMap.get(escapedText);
                    const translated = translatedMap[unescaped];
                    if (translated) {
                        return open + this.xmlEscape(translated) + close;
                    }
                    return match;
                });
                zip.updateFile(entry.entryName, Buffer.from(newContent, 'utf8'));
            }
        }
        
        zip.writeZip(outputPath);
        return outputPath;
    }
}

module.exports = new RebuildService();
