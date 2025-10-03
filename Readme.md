backend/
├── .env
├── package.json
├── server.js                    ← Main Express server
├── config/
│   └── gemini.js               ← Gemini configuration
├── controllers/
│   └── analyzeController.js    ← Analysis logic
├── middleware/
│   ├── upload.js               ← File upload middleware
│   └── validation.js           ← File validation
├── services/
│   ├── pdfParser.js           ← PDF extraction
│   ├── docxParser.js          ← DOCX extraction
│   └── aiService.js           ← Gemini AI service
└── uploads/                    ← Temporary file storage
