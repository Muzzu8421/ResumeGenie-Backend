const mammoth = require('mammoth');
const fs = require('fs');

async function extractTextFromDOCX(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer });
    
    return {
      success: true,
      text: result.value
    };
  } catch (error) {
    console.error('DOCX parsing error:', error);
    return {
      success: false,
      error: 'Failed to parse DOCX file'
    };
  }
}

module.exports = { extractTextFromDOCX };
