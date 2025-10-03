const { getModel } = require('../config/gemini.js');

async function analyzeResumeWithAI(resumeText) {
  try {
    const model = getModel();

    const prompt = `
You are an expert resume reviewer and ATS specialist. Analyze this resume and provide detailed, actionable feedback.

Resume Text:
${resumeText}

Provide your response as a valid JSON object with this exact structure:
{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "sections": {
    "contact": {
      "score": <number 0-100>,
      "issues": [<array of specific issues as strings>]
    },
    "summary": {
      "score": <number 0-100>,
      "issues": [<array of specific issues as strings>]
    },
    "experience": {
      "score": <number 0-100>,
      "issues": [<array of specific issues as strings>]
    },
    "skills": {
      "score": <number 0-100>,
      "issues": [<array of specific issues as strings>]
    },
    "education": {
      "score": <number 0-100>,
      "issues": [<array of specific issues as strings>]
    }
  },
  "strengths": [<array of 3-5 key strengths as strings>],
  "recommendations": [
    {
      "priority": "high" | "medium" | "low",
      "section": "<section name>",
      "title": "<brief title>",
      "description": "<detailed actionable suggestion>"
    }
  ],
  "keywords": {
    "present": [<array of found keywords as strings>],
    "missing": [<array of important missing keywords as strings>]
  }
}

Important: Return ONLY valid JSON, no markdown formatting, no code blocks.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean the response - remove markdown code blocks if present
    text = text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/```json\n?/g, '').replace(/```/g, '');
    }
    
    const analysis = JSON.parse(text);
    
    return {
      success: true,
      analysis
    };
  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      success: false,
      error: 'Failed to analyze resume with AI: ' + error.message
    };
  }
}

module.exports = { analyzeResumeWithAI };
