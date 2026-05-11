const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const ExcelJS = require('exceljs');

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
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        let content = '';

        workbook.eachSheet(sheet => {
            const rows = [];
            sheet.eachRow(row => {
                const values = [];
                row.eachCell({ includeEmpty: true }, cell => {
                    values.push(cell.text || '');
                });
                rows.push(values.join(' | '));
            });

            if (rows.length > 0) {
                content += `--- SHEET: ${sheet.name.toUpperCase()} ---\n${rows.join('\n')}\n\n`;
            }
        });

        return content || 'Empty Excel file';
    }
}

module.exports = new ExtractService();
