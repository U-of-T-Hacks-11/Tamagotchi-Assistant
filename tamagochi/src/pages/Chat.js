import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Group, TextInput, Button } from '@mantine/core'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import './Chat.css'
import { PiMicrophoneFill } from "react-icons/pi";
import { FaMicrophoneSlash } from "react-icons/fa";

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

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowRes(true)
        // console.log(input, chatHistory)
        // console.log('Fetching data')
        setIsLoading(true)
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
        setIsLoading(false)

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
  const reversedChatHistory = [...chatHistory].reverse();

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
    setInput('')
  }, [submitAPI, onRouterChange])

  // console.log(chatHistory)
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }
  

  return (
    <div className='chat-container' style={{ marginTop: '5px' }}>
      <div className='voice-control'>
        <div style={{ marginBottom: '5px' }}>
        
        <button
          className='chat-button'
          onClick={SpeechRecognition.startListening}
        >
              {listening ? <PiMicrophoneFill size={14} style={{marginRight: '5px' }}/> : <FaMicrophoneSlash size={14} style={{marginRight: '5px' }}/>}
    Start 

        </button>
        {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
        <button className='chat-button' style={{fontSize: '17px'}} onClick={resetTranscript}>
          Reset
        </button>

        </div>

      </div>
      <div className='input-section'>
          <input
            className='input'
            value={transcript ? transcript : input}
            onChange={(event) => setInput(event.currentTarget.value)}
            placeholder='Ask me a question!'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSubmitAPI(submitAPI + 1);
                // setInput('');  // Clear input after submission
                resetTranscript();
              }
            }}
          />
          <Button
            className='chat-button'
            onClick={() => {
              setSubmitAPI(submitAPI + 1)
              setInput(input + transcript)
              resetTranscript()
            }}
          >
            Submit
          </Button>
        </div>
      <div className='chat-display'>

        {/* add loading chat box */}
        <div className='loading'>
          {isLoading ? (
            <div className='loading-text chat-entry user'>Loading...</div>
          ) : (
            null
          )}
        </div>

        <div className='chat-history' style={{ overflow: 'hidden', maxWidth: '100%', maxHeight: '100vh' }}>
  {reversedChatHistory.map((entry, index) => (
    <div
      key={index}
      className={`chat-entry ${entry.role === 'USER' ? 'user' : 'assistant'}`}
      style={{ overflow: 'hidden' }}
    >
      {entry.message}
    </div>
  ))}
</div>
      </div>
    </div>
  )
}
