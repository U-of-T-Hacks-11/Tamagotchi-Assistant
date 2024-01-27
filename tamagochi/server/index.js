// server.js
const express = require('express')
const { CohereClient } = require('cohere-ai')

const app = express()
var cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3001

const cohere = new CohereClient({
  token: 'jFm3kg3Xxyq8RB4ryTSYnCxF3Ze9dAUjcDf4EEyw', // Replace with your actual API key
})

const examples = [
  { text: 'Start a 25-minute pomodoro timer', label: 'timer' },
  { text: 'Set a timer for 30 minutes', label: 'timer' },
  { text: 'Begin a 10-minute break', label: 'timer' },
  { text: 'Take a short break', label: 'timer' },
  { text: 'Start a new work session', label: 'timer' },
  { text: 'Create a note for the meeting', label: 'Take notes' },
  { text: 'Take notes on the presentation', label: 'Take notes' },
  { text: 'Jot down key points', label: 'Take notes' },
  { text: 'Write a summary of the discussion', label: 'Take notes' },
  { text: 'Capture action items in a note', label: 'Take notes' },
  { text: 'Record my thoughts', label: 'Take notes' },
  { text: 'Draft ideas for the project', label: 'Take notes' },
  { text: 'Create a checklist', label: 'Take notes' },
  { text: 'Write down important details', label: 'Take notes' },
]
app.get('/api/router', async (req, res) => {
  try {
    const message = req.headers['message'];
    
    const response = await cohere.classify({
      inputs: [message],
      examples: examples,
    });

    console.log(response.classifications[0].prediction, response.classifications[0].confidence);

    // if (response.classifications[0].confidence > 0.7) {
    //   res.json(response.classifications[0].prediction);
    // } else {
    //   res.json('Fallback');
    // }

    if (response.classifications[0].confidence > 0.88) {
      res.json({
        prediction: response.classifications[0].prediction
        // confidence: response.classifications[0].confidence,
      });
    } else {
      // res.json({ prediction: 'Fallback', confidence: 0 });
      res.json({ prediction: 'Fallback'});

    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/chat', async (req, res) => {
  try {
    // Extract user's message from headers
    const userMessage =
      req.headers['message'] + ' keep your response under 15 words' ||
      'Default message if header is not provided'

    console.log(req.headers)
    console.log(userMessage)
    console.log(req.headers['chathistory'])
    const parsedChatHistory = JSON.parse(req.headers['chathistory'])
    console.log('CHAT:' + parsedChatHistory)
    const headers = parsedChatHistory
      ? {
          chatHistory: parsedChatHistory,
          message: userMessage, // Use the user's message as the initial message
          connectors: [{ id: 'web-search' }],
        }
      : {
          message: userMessage, // Use the user's message as the initial message
          connectors: [{ id: 'web-search' }],
        }
    console.log(req.headers)

    const chatStream = await cohere.chatStream(headers)

    const messages = []

    for await (const message of chatStream) {
      if (message.eventType === 'text-generation') {
        messages.push(message.text)
        console.log(message.text)
      }
    }

    res.json(messages)
  } catch (error) {
    console.error('Error in chatStream:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
