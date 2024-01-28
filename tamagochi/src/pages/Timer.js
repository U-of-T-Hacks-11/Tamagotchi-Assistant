import { useState, useEffect } from "react";
import { Button, MantineProvider } from '@mantine/core';
import { FaPlay, FaPause, FaForward, FaUndo } from 'react-icons/fa';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("work");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              if (currentTimer === "work") {
                setCurrentTimer("break");
                setMinutes(5);
              } else {
                setCurrentTimer("work");
                setMinutes(25);
              }
              setIsRunning(false);
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, currentTimer]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    if (currentTimer === "work") {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
    setIsRunning(false);
  };

  const handleNextState = () => {
    if (currentTimer === "work") {
      setCurrentTimer("break");
      setMinutes(5);
    } else {
      setCurrentTimer("work");
      setMinutes(25);
    }
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <MantineProvider>
      <div className="center-div">
        <Button
          variant="filled"
          styles={{
            root: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 10,
              padding: '0.5rem 4rem',
              outline: 'none',
              border: '7px solid rgba(14, 51, 19, 0.74)',
              boxShadow: '0 0 50px 15px rgba(58, 122, 67, 0.2)',
            },
          }}
        >
          <h1 style={{ fontFamily: 'monospace' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </h1>
        </Button>
        <div className="button-container">
          <button onClick={handleReset} className="timer-button">
            <FaUndo />
          </button>
          <button onClick={handleStartStop} className="timer-button">
            {isRunning ? <FaPause />: <FaPlay />}
          </button>
          <button onClick={handleNextState} className="timer-button">
            <FaForward />
          </button>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Timer;
