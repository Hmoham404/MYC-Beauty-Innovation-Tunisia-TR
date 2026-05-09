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

// Serve static files from client/dist
const distPath = path.resolve(__dirname, '..', 'client', 'dist');
console.log(`\n📁 Static files path: ${distPath}`);
console.log(`   Path exists: ${fs.existsSync(distPath)}`);

if (fs.existsSync(distPath)) {
  // List files in dist
  try {
    const files = fs.readdirSync(distPath);
    console.log(`   Files in dist: ${files.slice(0, 5).join(', ')}${files.length > 5 ? '...' : ''}`);
    console.log(`   Total files: ${files.length}`);
  } catch (e) {
    console.log(`   Error reading dist: ${e.message}`);
  }
  
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: false
  }));
  console.log('✅ Static file middleware configured\n');
} else {
  console.log('⚠️  WARNING: client/dist directory not found!\n');
}

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  
  if (!req.path.startsWith('/api')) {
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    } else {
      console.error(`❌ index.html not found at: ${indexPath}`);
      return res.status(404).json({ error: 'index.html not found', path: indexPath });
    }
  }
  
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`   API: /api/documents`);
    console.log(`   Frontend: http://localhost:${PORT}\n`);
});
