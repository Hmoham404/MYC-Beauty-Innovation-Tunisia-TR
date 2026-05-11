require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const documentRoutes = require('./routes/documentRoutes');
const { ensureDirectories } = require('./services/fileStore');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
ensureDirectories();

// Logging middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

app.get('/health', (req, res) => {
  const distPath = path.resolve(__dirname, '..', 'client', 'dist');
  const distExists = fs.existsSync(distPath);
  res.json({ 
    status: 'ok', 
    message: 'MYC Innovation Document API is running',
    environment: process.env.NODE_ENV,
    distPath,
    distExists,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/documents', documentRoutes);

const distCandidates = [
  path.resolve(__dirname, '..', 'client', 'dist'),
  path.resolve(__dirname, '..', '..', 'client', 'dist'),
  path.resolve(process.cwd(), 'client', 'dist'),
  path.resolve('/var/task/client/dist') // Vercel Lambda path
];

let distPath = null;
for (const candidate of distCandidates) {
  if (fs.existsSync(candidate)) {
    distPath = candidate;
    console.log(`✅ Found dist at: ${distPath}`);
    break;
  }
}

if (!distPath) {
  console.warn('⚠️  No dist directory found. Static files will not be served.');
  console.log('Checked paths:', distCandidates);
}

if (distPath) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));
  console.log(`📁 Serving static files from: ${distPath}`);
}

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api') && distPath) {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }

  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);
  const isUploadError = err.code === 'LIMIT_FILE_SIZE' || /Invalid file type/i.test(err.message || '');
  res.status(isUploadError ? 400 : 500).json({ 
    error: err.message || 'Internal Server Error',
    type: err.code || 'UNKNOWN',
    timestamp: new Date().toISOString()
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
