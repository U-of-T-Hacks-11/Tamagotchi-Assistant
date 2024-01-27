// server.js
const express = require('express');
const { CohereClient } = require('cohere-ai');

const app = express();
var cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3001;

const cohere = new CohereClient({
  token: 'jFm3kg3Xxyq8RB4ryTSYnCxF3Ze9dAUjcDf4EEyw', // Replace with your actual API key
});

app.get('/api/chat', async (req, res) => {
    try {
        // Extract user's message from headers
        const userMessage = req.headers['message'] + "keep your response under 15 words"|| 'Default message if header is not provided';
        console.log(req.headers)
        console.log(req.headers['chathistory'])
        const parsedChatHistory = JSON.parse(req.headers['chathistory']);
        console.log("CHAT:" + parsedChatHistory)
        const headers = parsedChatHistory ? {
            chatHistory: parsedChatHistory,
            message: userMessage , // Use the user's message as the initial message
            connectors: [{ id: 'web-search' }],
          } : {
            message: userMessage, // Use the user's message as the initial message
            connectors: [{ id: 'web-search' }],
          }
        console.log(req.headers)
    
        const chatStream = await cohere.chatStream(headers);
    
        const messages = [];

    for await (const message of chatStream) {
      if (message.eventType === 'text-generation') {
        messages.push(message.text);
        console.log(message.text);
      }
    }

    res.json(messages);
  } catch (error) {
    console.error('Error in chatStream:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
