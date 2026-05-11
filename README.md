# MYC Document Platform

Full-stack document translation platform for PDF, DOCX, XLSX and PPTX files.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lucide React.
- Backend: Node.js, Express, Multer, PDF tools, Office XML reconstruction.
- Translation: Google public translation endpoint through the server service.

## Features

- Upload PDF, DOCX, XLSX and PPTX files.
- Translate to French, English, Arabic, Italian or Chinese.
- Rebuild the original file format after translation.
- Preview PDF files directly; preview DOCX/XLSX in-browser; preview PPTX as PDF when LibreOffice is available.
- Download the translated document in the same format.

## Local Development

Install dependencies:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Vercel Deployment

Import the `myc-document-platform` folder into Vercel. The included `vercel.json` builds the React client and serves the Express backend.

Important notes:

- Vercel serverless storage is temporary. Generated documents are kept in `/tmp` during runtime.
- Office-to-PDF preview needs LibreOffice. On standard Vercel, LibreOffice may not be available, so DOCX/XLSX/PPTX downloads can work while PDF previews may be unavailable.
- For production-grade file persistence, connect external storage such as S3, Cloudflare R2, Supabase Storage, or Vercel Blob.

## API

- `POST /api/documents/process-upload`: upload and translate in one request.
- `POST /api/documents/upload`: legacy upload endpoint.
- `POST /api/documents/process`: legacy process endpoint.
- `GET /api/documents/download/:filename`: download translated file.
- `GET /api/documents/view/:filename`: preview generated PDF.
- `GET /api/documents/raw/:filename`: get raw translated file.
