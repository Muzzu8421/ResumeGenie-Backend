const pdf = require('pdf-parse/lib/pdf-parse.js');
const fs = require('fs');

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    return {
      success: true,
      text: data.text,
      pages: data.numpages
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    return {
      success: false,
      error: 'Failed to parse PDF file: ' + error.message
    };
  }
}

module.exports = { extractTextFromPDF };
