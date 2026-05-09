require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'MYC Innovation Document API is running' });
});

// API Routes
app.use('/api/documents', documentRoutes);

// Serve static files from client/dist (absolute path)
const distPath = path.resolve(__dirname, '..', 'client', 'dist');
console.log(`📁 Looking for static files in: ${distPath}`);
console.log(`   Directory exists: ${fs.existsSync(distPath)}`);

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));
  console.log('✅ Static files served from client/dist');
} else {
  console.log('⚠️  client/dist not found, skipping static file serving');
}

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath) && !req.path.startsWith('/api')) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`\n✅ Server is running on port ${PORT}`);
    console.log(`   API: /api/documents`);
    console.log(`   Frontend: http://localhost:${PORT}\n`);
});
