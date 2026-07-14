const express = require('express')
const usersService = require('../services/usersService')
const { OpenAI } = require('openai')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  console.log( req.body);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // the AI model to use
    messages: [{ role: 'user', content: prompt }],
  });

  res.json({ reply: response.choices[0].message.content });
});


module.exports = router