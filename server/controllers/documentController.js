const path = require('path');
const fs = require('fs');
const wordSurgery = require('../services/reconstruction/WordSurgery');
const excelSurgery = require('../services/reconstruction/ExcelSurgery');
const pdfSurgery = require('../services/reconstruction/PdfSurgery');
const rebuildService = require('../services/rebuildService');
const { uploadDir, outputDir, ensureDirectories, safeJoin } = require('../services/fileStore');

const SUPPORTED_EXTENSIONS = new Set(['.pdf', '.docx', '.xlsx', '.pptx']);
const SUPPORTED_LANGUAGES = new Set(['fr', 'ar', 'en', 'it', 'zh']);

class DocumentController {
    constructor() {
        this.upload = this.upload.bind(this);
        this.processUploaded = this.processUploaded.bind(this);
        this.process = this.process.bind(this);
        this.download = this.download.bind(this);
        this.view = this.view.bind(this);
        this.raw = this.raw.bind(this);
        this.processFile = this.processFile.bind(this);
    }

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

    async processUploaded(req, res) {
        try {
            if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
            const { targetLanguage = 'fr' } = req.body;
            const result = await this.processFile(req.file.filename, targetLanguage);
            res.json({
                success: true,
                originalFile: req.file.filename,
                ...result
            });
        } catch (error) {
            console.error('[Controller] Processing error:', error);
            res.status(500).json({
                error: 'Document processing failed.',
                details: error.message
            });
        }
    }

    async process(req, res) {
        const { fileId, mode, targetLanguage } = req.body;
        if (!fileId || !mode) return res.status(400).json({ error: 'Missing parameters' });

        try {
            const result = await this.processFile(fileId, targetLanguage);
            res.json({
                success: true,
                originalFile: fileId,
                ...result
            });

        } catch (error) {
            console.error('[Controller] Processing error:', error);
            res.status(500).json({ 
                error: 'Document processing failed.',
                details: error.message 
            });
        }
    }

    async processFile(fileId, targetLanguage = 'fr') {
        ensureDirectories();

        if (!SUPPORTED_LANGUAGES.has(targetLanguage)) {
            throw new Error('Unsupported target language.');
        }

        const inputPath = safeJoin(uploadDir, fileId);
        if (!fs.existsSync(inputPath)) throw new Error('File not found.');

        const ext = path.extname(fileId).toLowerCase();
        if (!SUPPORTED_EXTENSIONS.has(ext)) {
            throw new Error('Unsupported file type. Please upload PDF, DOCX, XLSX or PPTX.');
        }

        const timestamp = Date.now();
        const translatedFilename = `translated_${timestamp}${ext}`;
        const translatedPath = path.join(outputDir, translatedFilename);

        console.log(`[Controller] Processing ${ext} document...`);

        let finalDocPath;
        if (ext === '.docx') {
            finalDocPath = await wordSurgery.process(inputPath, translatedPath, targetLanguage);
        } else if (ext === '.xlsx') {
            finalDocPath = await excelSurgery.process(inputPath, translatedPath, targetLanguage);
        } else if (ext === '.pptx') {
            finalDocPath = await rebuildService.rebuildPptx(inputPath, translatedPath, targetLanguage);
        } else {
            finalDocPath = await pdfSurgery.process(inputPath, translatedPath, targetLanguage);
        }

        const downloadUrl = `/api/documents/download/${translatedFilename}`;
        const rawUrl = `/api/documents/raw/${translatedFilename}`;

        let previewPdfFilename = translatedFilename;
        let previewAvailable = ext === '.pdf';
        if (ext !== '.pdf') {
            try {
                const pdfPreviewPath = path.join(outputDir, `preview_${timestamp}.pdf`);
                await pdfSurgery.convertToPdf(finalDocPath, pdfPreviewPath);
                previewPdfFilename = path.basename(pdfPreviewPath);
                previewAvailable = true;
            } catch (previewError) {
                console.warn('[Controller] Preview generation skipped:', previewError.message);
            }
        }

        return {
            translatedFile: translatedFilename,
            viewUrl: previewAvailable ? `/api/documents/view/${previewPdfFilename}` : null,
            downloadUrl,
            rawUrl,
            layoutPreserved: true,
            previewAvailable,
            message: 'Document translated and rebuilt while preserving the original structure as closely as possible.'
        };
    }

    async download(req, res) {
        let filePath;
        try {
            filePath = safeJoin(outputDir, req.params.filename);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    }

    async view(req, res) {
        let filePath;
        try {
            filePath = safeJoin(outputDir, req.params.filename);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        if (fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline");
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'Preview file not found' });
        }
    }

    async raw(req, res) {
        let filePath;
        try {
            filePath = safeJoin(outputDir, req.params.filename);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    }
}

module.exports = new DocumentController();
