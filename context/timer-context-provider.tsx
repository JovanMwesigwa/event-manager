"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

interface TimerContextType {
  hours: number;
  minutes: number;
  seconds: number;
  progress: number;
  startTimer: (duration: number) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

export const TimerContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    // Load state from localStorage on mount
    const savedDuration = Number(localStorage.getItem("timerDuration"));
    const savedRemaining = Number(
      localStorage.getItem("timerSecondsRemaining")
    );
    const isPaused = localStorage.getItem("timerPaused") === "true";

    if (savedDuration && savedRemaining) {
      setDuration(savedDuration);
      setSecondsRemaining(savedRemaining);
      setPaused(isPaused);
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (!paused && secondsRemaining > 0) {
      interval = window.setInterval(() => {
        setSecondsRemaining((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    } else if (paused) {
      clearInterval(interval);
    }

    // Save state to localStorage on change
    localStorage.setItem("timerDuration", duration.toString());
    localStorage.setItem("timerSecondsRemaining", secondsRemaining.toString());
    localStorage.setItem("timerPaused", paused.toString());

    return () => clearInterval(interval);
  }, [paused, secondsRemaining, duration]);

  const progress =
    duration > 0 ? ((duration - secondsRemaining) / duration) * 100 : 0;

  const startTimer = (duration: number) => {
    setDuration(duration);
    setSecondsRemaining(duration);
    setPaused(false);
  };

  const pauseTimer = () => {
    setPaused(true);
  };

  const resetTimer = () => {
    setSecondsRemaining(duration);
    setPaused(false);
  };

  // Calculate hours, minutes, and seconds from secondsRemaining
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return (
    <TimerContext.Provider
      value={{
        hours,
        minutes,
        seconds,
        progress,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
