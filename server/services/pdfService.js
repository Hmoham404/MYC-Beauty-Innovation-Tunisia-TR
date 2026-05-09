const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

class PDFService {
    // Primary method: Convert any document to PDF using LibreOffice
    async convertToPdfWithLibreOffice(inputPath, outputDir) {
        return new Promise((resolve, reject) => {
            // Common paths for LibreOffice on Windows
            const possiblePaths = [
                'soffice', // If in PATH
                '"C:\\Program Files\\LibreOffice\\program\\soffice.exe"',
                '"C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe"',
                `"${process.env.LIBREOFFICE_PATH}"` // Optional env var
            ];

            let attemptConversion = (index) => {
                if (index >= possiblePaths.length) {
                    return reject(new Error('LibreOffice not found. Please install it or add to PATH.'));
                }

                const soffice = possiblePaths[index];
                if (soffice === '"undefined"') return attemptConversion(index + 1);

                console.log(`Trying LibreOffice conversion with: ${soffice}`);
                const cmd = `${soffice} --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
                
                exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        console.warn(`Attempt ${index + 1} failed for ${soffice}`);
                        return attemptConversion(index + 1);
                    }
                    
                    const inputBasename = path.basename(inputPath, path.extname(inputPath));
                    const expectedPdfPath = path.join(outputDir, `${inputBasename}.pdf`);
                    
                    if (fs.existsSync(expectedPdfPath)) {
                        console.log('PDF conversion successful.');
                        resolve(expectedPdfPath);
                    } else {
                        attemptConversion(index + 1);
                    }
                });
            };

            attemptConversion(0);
        });
    }

    // Fallback/Legacy method: Generate PDF from raw text using Puppeteer
    async generatePDF(text, outputPath, options = {}) {
        let browser;
        try {
            browser = await puppeteer.launch({
                headless: "new",
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            const isArabic = /[\u0600-\u06FF]/.test(text);
            const direction = isArabic ? 'rtl' : 'ltr';

            const htmlContent = `
            <html>
                <body style="font-family: Arial; padding: 40px; direction: ${direction};">
                    <h1 style="color: #E31E24; border-bottom: 2px solid #E31E24;">${options.title || 'MYC Document'}</h1>
                    <div style="white-space: pre-wrap; font-size: 12px; line-height: 1.6;">${text}</div>
                </body>
            </html>`;

            await page.setContent(htmlContent);
            await page.pdf({ path: outputPath, format: 'A4', margin: { top: '20mm', bottom: '20mm' } });
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = new PDFService();
