const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', upload.single('file'), documentController.upload);
router.post('/process', documentController.process);
router.get('/download/:filename', documentController.download);
router.get('/view/:filename', documentController.view);
router.get('/raw/:filename', documentController.raw);

module.exports = router;
