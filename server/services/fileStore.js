const fs = require('fs');
const os = require('os');
const path = require('path');

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const baseDir = isServerless
    ? path.join(os.tmpdir(), 'myc-document-platform')
    : path.join(__dirname, '..');

const uploadDir = path.join(baseDir, 'uploads');
const outputDir = path.join(baseDir, 'outputs');

function ensureDirectories() {
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });
}

function safeJoin(root, filename) {
    const cleanName = path.basename(filename || '');
    if (!cleanName || cleanName !== filename) {
        throw new Error('Invalid filename');
    }

    const resolved = path.resolve(root, cleanName);
    const resolvedRoot = path.resolve(root);
    if (!resolved.startsWith(resolvedRoot + path.sep) && resolved !== resolvedRoot) {
        throw new Error('Invalid file path');
    }

    return resolved;
}

module.exports = {
    baseDir,
    uploadDir,
    outputDir,
    ensureDirectories,
    safeJoin
};
