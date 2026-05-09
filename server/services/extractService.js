const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');

class ExtractService {
    async extractText(filePath, mimeType) {
        if (mimeType === 'application/pdf') {
            return await this.extractPDF(filePath);
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimeType === 'application/msword') {
            return await this.extractWord(filePath);
        } else if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || mimeType === 'application/vnd.ms-excel') {
            return await this.extractExcel(filePath);
        } else {
            throw new Error('Unsupported file type');
        }
    }

    async extractPDF(filePath) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;
    }

    async extractWord(filePath) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    async extractExcel(filePath) {
        const workbook = xlsx.readFile(filePath);
        let content = '';
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            // Use CSV format for better cell separation in raw text
            const data = xlsx.utils.sheet_to_csv(worksheet, { FS: ' | ' }); 
            if (data.trim()) {
                content += `--- SHEET: ${sheetName.toUpperCase()} ---\n${data}\n\n`;
            }
        });
        return content || 'Empty Excel file';
    }
}

module.exports = new ExtractService();
