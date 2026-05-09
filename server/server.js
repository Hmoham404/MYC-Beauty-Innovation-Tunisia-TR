require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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

// API Routes
app.use('/api/documents', documentRoutes);

// Serve static files from client/dist
const staticDir = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(staticDir));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't fallback for actual files
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(staticDir, 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'MYC Innovation Document API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving frontend from: ${staticDir}`);
});
