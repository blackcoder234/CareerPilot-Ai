const fs = require('fs');
const PDFParser = require('pdf2json');
const buffer = fs.readFileSync('./public/resume.pdf');
const pdfParser = new PDFParser(null, 1);
pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', () => {
    console.log('Extracted text:', pdfParser.getRawTextContent().substring(0, 500));
});
pdfParser.parseBuffer(buffer);
