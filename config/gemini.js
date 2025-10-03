const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getModel = () => {
  // Use Gemini 2.5 Pro for highest quality analysis
  return genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
};

module.exports = { getModel };
