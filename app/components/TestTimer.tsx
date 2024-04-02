"use client";

import React, { useState, useEffect } from "react";

interface TimerState {
  isActive: boolean;
  seconds: number;
  startTime?: number;
}

function TestTimer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const savedStateJSON = localStorage.getItem("timerState");
    if (savedStateJSON) {
      const savedState: TimerState = JSON.parse(savedStateJSON);
      if (savedState.isActive) {
        setIsActive(true);
        const now = new Date().getTime();
        const elapsed = savedState.startTime
          ? Math.floor((now - savedState.startTime) / 1000)
          : 0;
        setSeconds(savedState.seconds + elapsed);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      const startTime = new Date().getTime() - seconds * 1000;
      const state: TimerState = { isActive, seconds, startTime };
      localStorage.setItem("timerState", JSON.stringify(state));
    } else if (interval) {
      clearInterval(interval);
      const state: TimerState = { isActive, seconds };
      localStorage.setItem("timerState", JSON.stringify(state));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    localStorage.removeItem("timerState");
  };

  return (
    <div>
      <h2>Stop Timer</h2>
      <div>{seconds}s</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default TestTimer;
