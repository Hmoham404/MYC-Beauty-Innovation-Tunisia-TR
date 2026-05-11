const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const wordSurgery = require('./WordSurgery');
const libre = require('libreoffice-convert');
const util = require('util');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const arabicReshaper = require('arabic-reshaper');
const bidiFactory = require('bidi-js');
const bidi = bidiFactory();
const PDFParser = require('pdf2json');

const convertAsync = util.promisify(libre.convert);

class PdfSurgery {
    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[PdfSurgery] Processing: ${inputPath}`);
        
        try {
            // Try High-Fidelity Pipeline (PDF -> DOCX -> PDF) first
            return await this.highFidelityPipeline(inputPath, outputPath, targetLanguage);
        } catch (err) {
            console.warn(`[PdfSurgery] High-fidelity pipeline failed: ${err.message}. Switching to coordinate-based fallback.`);
            // Fallback: Coordinate-based replacement
            return await this.coordinateBasedFallback(inputPath, outputPath, targetLanguage);
        }
    }

    async highFidelityPipeline(inputPath, outputPath, targetLanguage) {
        const tempDir = path.dirname(outputPath);
        const timestamp = Date.now();
        const docxPath = path.join(tempDir, `layout_temp_${timestamp}.docx`);
        
        await this.pdfToDocx(inputPath, docxPath);
        
        const translatedDocxPath = path.join(tempDir, `translated_layout_${timestamp}.docx`);
        await wordSurgery.process(docxPath, translatedDocxPath, targetLanguage);
        await this.docxToPdf(translatedDocxPath, outputPath);
        
        if (fs.existsSync(docxPath)) fs.unlinkSync(docxPath);
        if (fs.existsSync(translatedDocxPath)) fs.unlinkSync(translatedDocxPath);
        
        return outputPath;
    }

    async coordinateBasedFallback(inputPath, outputPath, targetLanguage) {
        const translationService = require('../translationService');
        const pdfParser = new PDFParser();
        
        return new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
            pdfParser.on("pdfParser_dataReady", async (pdfData) => {
                try {
                    const existingPdfBytes = fs.readFileSync(inputPath);
                    const pdfDoc = await PDFDocument.load(existingPdfBytes);
                    pdfDoc.registerFontkit(fontkit);

                    // Embed a Unicode-compatible font (Arial) to support Arabic, etc.
                    let font;
                    const fontPath = process.env.PDF_FONT_PATH || 'C:\\Windows\\Fonts\\arial.ttf';
                    try {
                        if (fs.existsSync(fontPath)) {
                            const fontBytes = fs.readFileSync(fontPath);
                            font = await pdfDoc.embedFont(fontBytes);
                        } else {
                            font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                        }
                    } catch (e) {
                        console.warn("[PdfSurgery] Failed to embed Arial, falling back to Helvetica:", e.message);
                        font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                    }

                    const pages = pdfDoc.getPages();

                    for (let i = 0; i < pdfData.Pages.length; i++) {
                        const pageData = pdfData.Pages[i];
                        const page = pages[i];
                        const { width, height } = page.getSize();

                        for (const textData of pageData.Texts) {
                            // Join all text runs in this block
                            const originalText = textData.R.map(r => decodeURIComponent(r.T)).join('').trim();
                            if (originalText.length === 0) continue;

                            let translatedText = await translationService.translateText(originalText, targetLanguage);
                            
                            // Handle Arabic Shaping and BiDi
                            if (targetLanguage === 'ar' || /[\u0600-\u06FF]/.test(translatedText)) {
                                const reshapedText = arabicReshaper.reshape(translatedText);
                                translatedText = bidi.getReorderedText(reshapedText);
                            }
                            
                            // Coordinates from pdf2json are 1/100th of page
                            const x = (textData.x * width) / 100;
                            const y = height - (textData.y * height) / 100;
                            
                            // Get font size from the first run or default (in points)
                            const fontSize = textData.R[0].TS[2] || 10;
                            
                            // Calculate precise widths
                            const originalWidth = font.widthOfTextAtSize(originalText, fontSize) || (originalText.length * fontSize * 0.5);
                            const translatedWidth = font.widthOfTextAtSize(translatedText, fontSize) || (translatedText.length * fontSize * 0.5);

                            // 1. Mask original text with white rectangle
                            // We add a tiny bit of padding to the mask
                            page.drawRectangle({
                                x: x - 1,
                                y: y - (fontSize * 0.2), // Adjust for baseline
                                width: originalWidth + 2,
                                height: fontSize * 1.2,
                                color: rgb(1, 1, 1),
                            });

                            // 2. Draw translated text
                            // If it's too wide, we might need to scale it down slightly
                            const maxWidth = width - x - 5;
                            const finalSize = translatedWidth > maxWidth ? (fontSize * maxWidth / translatedWidth) : fontSize;

                            page.drawText(translatedText, {
                                x: x,
                                y: y,
                                size: finalSize,
                                font: font,
                                color: rgb(0, 0, 0),
                            });
                        }
                    }

                    const pdfBytes = await pdfDoc.save();
                    fs.writeFileSync(outputPath, pdfBytes);
                    resolve(outputPath);
                } catch (err) {
                    reject(err);
                }
            });

            pdfParser.loadPDF(inputPath);
        });
    }

    async pdfToDocx(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const sofficePaths = [
                process.env.LIBREOFFICE_PATH,
                'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
                'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
                'soffice'
            ].filter(Boolean);

            const trySoffice = (index) => {
                if (index >= sofficePaths.length) return reject(new Error('LibreOffice not found.'));
                
                const outputDir = path.dirname(outputPath);
                const args = ['--headless', '--infilter=PDF (export)', '--convert-to', 'docx', '--outdir', outputDir, inputPath];
                
                execFile(sofficePaths[index], args, (error) => {
                    if (error) return trySoffice(index + 1);
                    this.renameConvertedFile(inputPath, outputDir, '.docx', outputPath, resolve);
                });
            };

            trySoffice(0);
        });
    }

    async docxToPdf(inputPath, outputPath) {
        return this.convertToPdf(inputPath, outputPath);
    }

    async convertToPdf(inputPath, outputPath) {
        try {
            const docxBuffer = fs.readFileSync(inputPath);
            const pdfBuffer = await convertAsync(docxBuffer, '.pdf', undefined);
            fs.writeFileSync(outputPath, pdfBuffer);
        } catch (err) {
            // If conversion fails, it might be due to LibreOffice missing
            throw new Error('LibreOffice failed to convert this document to PDF.');
        }
    }

    renameConvertedFile(inputPath, outputDir, targetExt, finalPath, resolve) {
        const basename = path.basename(inputPath, path.extname(inputPath));
        const generatedPath = path.join(outputDir, `${basename}${targetExt}`);
        if (fs.existsSync(generatedPath)) {
            if (generatedPath !== finalPath) {
                fs.renameSync(generatedPath, finalPath);
            }
            resolve();
        } else {
            resolve();
        }
    }
}

module.exports = new PdfSurgery();
