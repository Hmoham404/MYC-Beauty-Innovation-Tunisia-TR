# MYC INNOVATION - Smart Document Platform

A full-stack professional platform for converting and translating documents (PDF, Word, Excel) into polished PDFs.

## 🚀 Technologies

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React, flag-icons, Axios.
- **Backend**: Node.js, Express.js, Multer, PDFKit, Mammoth.js, XLSX, PDF-Parse.

## 📦 Features

- **Multi-format Support**: Upload `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`.
- **AI Translation**: Translate content into French, English, Arabic, Chinese, or Italian.
- **Professional PDF Generation**: Branded output with MYC INNOVATION styling.
- **Responsive Design**: Modern SaaS interface optimized for all devices.

## 🛠️ Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
```
Edit `.env` and add your `API_KEY` for translations.

### 2. Client Setup
```bash
cd client
npm install
```

## 🏃 Running the Application

### Start Backend
```bash
cd server
npm run dev
```
The server will run on [http://localhost:5000](http://localhost:5000).

### Start Frontend
```bash
cd client
npm run dev
```
The application will be available on [http://localhost:5173](http://localhost:5173).

## 📁 Project Structure

- `client/`: React application (Vite).
- `server/`: Express API.
  - `services/`: Extraction, Translation, and PDF generation logic.
  - `uploads/`: Temporary storage for original files.
  - `outputs/`: Storage for generated PDFs.

## 📝 API Endpoints

- `POST /api/documents/upload`: Upload a document.
- `POST /api/documents/process`: Process (convert/translate) a document.
- `GET /api/documents/download/:filename`: Download generated PDF.
- `GET /api/documents/view/:filename`: View generated PDF in browser.

---
© 2024 MYC INNOVATION
"# MYC-Beauty-Innovation-Tunisia-TR" 
