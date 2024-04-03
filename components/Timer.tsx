"use client";

import React, { useState, useEffect } from "react";

const Timer = ({ endTime }: { endTime: string }) => {
  const targetDate = new Date(endTime);

  const [timeLeft, setTimeLeft] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  function calculateTimeLeft(targetDate: Date) {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((difference / 1000) % 60)
        .toString()
        .padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    } else {
      return "00:00:00";
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div>
      <div>{timeLeft}</div>
      <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
    </div>
  );
};

export default Timer;
