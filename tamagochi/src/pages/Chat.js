import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Group, TextInput, Button } from '@mantine/core'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import './Chat.css'

export default function Chat({ onRouterChange }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ continuous: true })
  const [messages, setMessages] = useState('')
  const [input, setInput] = useState('')
  const [submitAPI, setSubmitAPI] = useState(0)
  const [chatHistory, setChatHistory] = useState([])

  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowRes(true)
        // console.log(input, chatHistory)
        // console.log('Fetching data')
        setInput(input)
        const response = await axios.get('http://localhost:3001/api/chat', {
          headers: {
            message: input,
            chatHistory: JSON.stringify(chatHistory).replace(
              /[^\x00-\x7F]/g,
              ''
            ),
          }, // Add a header named 'message'
        })
        setMessages(response.data.join(''))
        console.log(chatHistory)

        // if (messages && showRes) {
        //   const newMessages = [
        //     ...messages,
        //     { text: input, isUser: true },
        //     { text: messages, isUser: false },
        //   ]
        //   setMessageList(newMessages) // Update messages array with user input and bot response
        // }

        setChatHistory([
          ...chatHistory,
          { role: 'USER', message: input },
          { role: 'CHATBOT', message: response.data.join('') },
        ])
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }
    setInput('')
    if (submitAPI > 0) {
      fetchData()
    }
  }, [submitAPI])

  const [router, setRouter] = useState('__')
  const [showRes, setShowRes] = useState(true)

  useEffect(() => {
    const changeFeature = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/router', {
          headers: {
            message: input,
          },
        })
        console.log(response.data) // Log the response to check the received data
        setRouter(response.data)
        if (response.data.prediction !== 'Fallback') {
          onRouterChange(response.data.prediction)
          setShowRes(false)
        } else {
          setShowRes(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    if (submitAPI > 0) {
      changeFeature()
    }
  }, [submitAPI, onRouterChange])

  // console.log(chatHistory)
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div>
      <h1>Chat</h1>

      <p1>voice</p1>

      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <div>
        <Group style={{ position: 'absolute', height: '5vh', width: '100%' }}>
          <TextInput
            value={transcript ? transcript : input}
            onChange={(event) => setInput(event.currentTarget.value)}
            placeholder='Ask me a question!'
          />
          <Button
            onClick={() => {
              setSubmitAPI(submitAPI + 1)
              setInput(input + transcript)
              resetTranscript()
            }}
          >
            Submit
          </Button>
          {/* <h1>{router}</h1> */}
          {/* <h1>{typeof router === 'object' ? router.prediction : router}</h1> */}

          <div id='div1' style={{ height: '500px', position: 'relative' }}>
            <div
              id='div2'
              style={{
                maxHeight: '100%',
                overflow: 'auto',
                border: '1px solid red',
              }}
            >
              <div
                id='div3'
                style={{ height: '1500px', border: '5px solid yellow' }}
              >
                {chatHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={`${
                      entry.role === 'USER' ? 'user' : 'assistant'
                    }`}
                  >
                    <p>{entry.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* {showRes ? <p>{messages}</p> : null} */}
        </Group>
      </div>
    </div>
  )
}
