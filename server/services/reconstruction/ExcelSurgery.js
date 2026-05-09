const ExcelJS = require('exceljs');
const translationService = require('../translationService');

class ExcelSurgery {
    async process(inputPath, outputPath, targetLanguage) {
        console.log(`[ExcelSurgery] Processing: ${inputPath}`);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputPath);

        const translateCell = async (cell) => {
            // We only translate String or RichText values
            // Styles, colors, borders are attached to the cell object and should remain untouched
            
            if (cell.type === ExcelJS.ValueType.String && cell.value && cell.value.trim().length > 0) {
                try {
                    const translated = await translationService.translateText(cell.value, targetLanguage);
                    cell.value = translated;
                } catch (err) {
                    console.error(`[ExcelSurgery] Error translating cell: ${cell.value}`);
                }
            } else if (cell.type === ExcelJS.ValueType.RichText && cell.value.richText) {
                for (const part of cell.value.richText) {
                    if (part.text && part.text.trim().length > 0) {
                        try {
                            part.text = await translationService.translateText(part.text, targetLanguage);
                        } catch (err) {
                            console.error(`[ExcelSurgery] Error translating RichText: ${part.text}`);
                        }
                    }
                }
            }
        };

        const tasks = [];
        workbook.eachSheet(sheet => {
            sheet.eachRow(row => {
                row.eachCell({ includeEmpty: false }, cell => {
                    // Skip formulas, numbers, dates
                    if (cell.type === ExcelJS.ValueType.String || cell.type === ExcelJS.ValueType.RichText) {
                        tasks.push(translateCell(cell));
                    }
                });
            });
        });

        // Run translations
        // Note: For very large files, you might want to batch this
        await Promise.all(tasks);

        await workbook.xlsx.writeFile(outputPath);
        return outputPath;
    }
}

module.exports = new ExcelSurgery();
