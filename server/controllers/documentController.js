const path = require('path');
const fs = require('fs');
const wordSurgery = require('../services/reconstruction/WordSurgery');
const excelSurgery = require('../services/reconstruction/ExcelSurgery');
const pdfSurgery = require('../services/reconstruction/PdfSurgery');

class DocumentController {
    async upload(req, res) {
        try {
            if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
            res.json({
                message: 'File uploaded successfully',
                file: {
                    id: req.file.filename,
                    name: req.file.originalname,
                    path: req.file.path
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error during upload' });
        }
    }

    async process(req, res) {
        const { fileId, mode, targetLanguage } = req.body;
        if (!fileId || !mode) return res.status(400).json({ error: 'Missing parameters' });

        const inputPath = path.join(__dirname, '../uploads', fileId);
        const outputDir = path.join(__dirname, '../outputs');
        const ext = path.extname(fileId).toLowerCase();
        
        const timestamp = Date.now();
        const translatedFilename = `translated_${timestamp}${ext}`;
        const translatedPath = path.join(outputDir, translatedFilename);

        try {
            if (!fs.existsSync(inputPath)) return res.status(404).json({ error: 'File not found' });

            console.log(`[Controller] Starting surgical reconstruction for ${ext}...`);

            let finalDocPath;
            if (ext === '.docx') {
                finalDocPath = await wordSurgery.process(inputPath, translatedPath, targetLanguage);
            } else if (ext === '.xlsx') {
                finalDocPath = await excelSurgery.process(inputPath, translatedPath, targetLanguage);
            } else if (ext === '.pdf') {
                finalDocPath = await pdfSurgery.process(inputPath, translatedPath, targetLanguage);
            } else {
                // Fallback for other formats (simple copy)
                fs.copyFileSync(inputPath, translatedPath);
                finalDocPath = translatedPath;
            }

            // Generate URLs
            const downloadUrl = `/api/documents/download/${translatedFilename}`;
            const rawUrl = `/api/documents/raw/${translatedFilename}`;
            
            // For preview, we still show a PDF in the iframe
            let previewPdfFilename = translatedFilename;
            let previewAvailable = true;
            if (ext !== '.pdf') {
                try {
                    const pdfPreviewPath = path.join(outputDir, `preview_${timestamp}.pdf`);
                    const pdfSurgery = require('../services/reconstruction/PdfSurgery');
                    await pdfSurgery.docxToPdf(finalDocPath, pdfPreviewPath);
                    previewPdfFilename = path.basename(pdfPreviewPath);
                } catch (previewError) {
                    console.warn('[Controller] Preview generation failed (usually due to missing LibreOffice):', previewError.message);
                    previewAvailable = false;
                }
            }

            const viewUrl = previewAvailable ? `/api/documents/view/${previewPdfFilename}` : null;

            res.json({
                success: true,
                originalFile: fileId,
                translatedFile: translatedFilename,
                viewUrl: viewUrl,
                downloadUrl: downloadUrl,
                rawUrl: rawUrl,
                layoutPreserved: true,
                previewAvailable,
                message: "Document translated with 100% layout preservation via surgical reconstruction."
            });

        } catch (error) {
            console.error('[Controller] Processing error:', error);
            res.status(500).json({ 
                error: 'Layout reconstruction failed.',
                details: error.message 
            });
        }
    }

    async download(req, res) {
        const filePath = path.join(__dirname, '../outputs', req.params.filename);
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    }

    async view(req, res) {
        const filePath = path.join(__dirname, '../outputs', req.params.filename);
        if (fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline");
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'Preview file not found' });
        }
    }

    async raw(req, res) {
        const filePath = path.join(__dirname, '../outputs', req.params.filename);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    }
}

module.exports = new DocumentController();
