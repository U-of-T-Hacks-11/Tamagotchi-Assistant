import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Group, TextInput, Button } from '@mantine/core';

export default function Chat() {
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const [submitAPI, setSubmitAPI] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(input, chatHistory);
        console.log('Fetching data');
        const response = await axios.get('http://localhost:3001/api/chat', {
          headers: { message: input, chatHistory: JSON.stringify(chatHistory).replace(/[^\x00-\x7F]/g, "") }, // Add a header named 'message'
        });
        setMessages(response.data.join(''));
        setChatHistory([...chatHistory, { role: 'USER', message: input }, { role: 'CHATBOT', message: response.data.join('') }]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    setInput('')
    if (submitAPI > 0) {
      fetchData();
    }
  }, [submitAPI]);

  console.log(chatHistory);

  return (
    <div>
      <Group style={{ position: 'absolute', height: '5vh', width: '100%' }}>
        <TextInput
          value={input }
          onChange={(event) => setInput(event.currentTarget.value)}
          placeholder="Ask me a question!"
        />
        <Button onClick={() => {setSubmitAPI(submitAPI + 1); }}>Submit</Button>
        <div>{messages}</div>
      </Group>
    </div>
  );
}
