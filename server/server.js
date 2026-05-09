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

// Log startup info
console.log('\n========== MYC Document Platform ==========');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Current directory: ${__dirname}`);
console.log(`Working directory: ${process.cwd()}`);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'MYC Innovation Document API is running' });
});

// API Routes
app.use('/api/documents', documentRoutes);

// Try to find and serve static files
let distPath = path.resolve(__dirname, '..', 'client', 'dist');
console.log(`\nLooking for static files at: ${distPath}`);

// If not found, try alternative path
if (!fs.existsSync(distPath)) {
  distPath = path.resolve(__dirname, '..', '..', 'client', 'dist');
  console.log(`Not found, trying alternative: ${distPath}`);
}

// If still not found, try current directory
if (!fs.existsSync(distPath)) {
  distPath = path.resolve(process.cwd(), 'client', 'dist');
  console.log(`Not found, trying cwd: ${distPath}`);
}

if (fs.existsSync(distPath)) {
  console.log(`✅ Static files found!`);
  try {
    const files = fs.readdirSync(distPath);
    console.log(`   Files: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`);
  } catch (e) {
    console.log(`   Error listing files: ${e.message}`);
  }
  
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));
  console.log('✅ Static file middleware active\n');
} else {
  console.log(`⚠️  WARNING: Static files directory not found`);
  console.log(`   Tried: ${distPath}\n`);
}

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
    console.log(`========================================\n`);
});
