require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/documents', documentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Static files for health check or testing
app.get('/', (req, res) => {
    res.json({ message: 'MYC Innovation Document API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
