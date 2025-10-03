const fs = require('fs');
const path = require('path');
const { extractTextFromPDF } = require('../services/pdfParser.js');
const { extractTextFromDOCX } = require('../services/docxParser.js');
const { analyzeResumeWithAI } = require('../services/aiService.js');

async function analyzeResume(req, res) {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    filePath = req.file.path;
    const fileType = req.file.mimetype;

    console.log('Processing file:', req.file.originalname);
    console.log('File type:', fileType);

    // Extract text based on file type
    let extractResult;
    if (fileType === 'application/pdf') {
      extractResult = await extractTextFromPDF(filePath);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractResult = await extractTextFromDOCX(filePath);
    } else {
      return res.status(400).json({
        success: false,
        error: 'Unsupported file type'
      });
    }

    if (!extractResult.success) {
      return res.status(500).json({
        success: false,
        error: extractResult.error
      });
    }

    console.log('Text extracted successfully. Length:', extractResult.text.length);

    // Analyze with AI
    console.log('Analyzing with AI...');
    const aiResult = await analyzeResumeWithAI(extractResult.text);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        error: aiResult.error
      });
    }

    console.log('Analysis complete!');

    // Clean up uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Temporary file deleted');
    }

    // Return analysis
    return res.json({
      success: true,
      data: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        ...aiResult.analysis
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up file on error
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
}

module.exports = { analyzeResume };
