const multer = require('multer');
const path = require('path');
const { uploadDir, ensureDirectories } = require('../services/fileStore');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureDirectories();
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname).toLowerCase());
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    const allowedExtensions = ['.pdf', '.docx', '.xlsx', '.pptx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(ext) && (!file.mimetype || allowedMimes.includes(file.mimetype))) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOCX, XLSX and PPTX are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

module.exports = upload;
