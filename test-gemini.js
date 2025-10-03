const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function testGemini() {
  try {
    console.log('Testing Gemini 2.5 Pro...\n');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    
    const result = await model.generateContent('Hello! Just testing the API.');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini 2.5 Pro is working!');
    console.log('Response:', text);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('\nFull error:', error);
  }
}

testGemini();
