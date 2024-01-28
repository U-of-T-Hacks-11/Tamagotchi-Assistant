import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextInput, Button } from '@mantine/core'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { PiMicrophoneFill } from 'react-icons/pi'
import { FaMicrophoneSlash } from 'react-icons/fa'

export default function Summarizer({ onRouterChange }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ continuous: true })
  const [input, setInput] = useState('')
  const [submitAPI, setSubmitAPI] = useState(0)
  const [output, SetOutput] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        console.log(input)
        const response = await axios.get(
          'http://localhost:3001/api/summarize',
          {
            headers: {
              message: input.replace(/[^\x00-\x7F]/g, ''),
            },
          }
        )

        SetOutput(response.data)
        console.log(response.data)
        setIsLoading(false)

        if (response.data.summary) {
          onRouterChange(response.data.summary)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    if (submitAPI > 0) {
      fetchData()
    }
  }, [submitAPI, onRouterChange])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div className='chat-container'>
      <div className='input-section' style={{ marginTop: '25px' }}>
        <input
          className='input'
          value={transcript ? transcript : input}
          onChange={(event) => setInput(event.currentTarget.value)}
          placeholder='Ask me a question!'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSubmitAPI(submitAPI + 1)
              resetTranscript()
              setInput('')
            }
          }}
        />
        <Button
          className='chat-button'
          onClick={() => {
            setSubmitAPI(submitAPI + 1)
            resetTranscript()
            setInput('')
          }}
        >
          Submit
        </Button>
      </div>

      <div className='chat-display'>
        <div className='chat-entry user'>{output.summary}</div>

        <div className='loading'>
          {isLoading ? (
            <div className='loading-text chat-entry user'>Loading...</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
