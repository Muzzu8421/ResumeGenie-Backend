const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js');
const { analyzeResume } = require('../controllers/analyzeController.js');

// POST /api/analyze
router.post('/', upload.single('resume'), analyzeResume);

module.exports = router;
