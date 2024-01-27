import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {  MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MantineProvider>
    <div style={{ width: '350px', height: '560px', padding: '20px' }}>
      <div style={{ backgroundColor: '#9ca499'}}>
        <App />
      </div>
    </div>
    </MantineProvider >
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
