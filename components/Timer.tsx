"use client";

import { PauseIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Progress } from "./ui/progress";

interface TimerProps {
  activityId: number;
  paused: boolean;
  durationInSeconds: number;
  eventLife: boolean;
}

const Timer: React.FC<TimerProps> = ({
  activityId,
  paused,
  durationInSeconds,
  eventLife,
}) => {
  const [secondsRemaining, setSecondsRemaining] =
    useState<number>(durationInSeconds);

  useEffect(() => {
    let interval: number | undefined;

    if (!paused) {
      interval = window.setInterval(() => {
        setSecondsRemaining((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    } else if (paused && secondsRemaining !== durationInSeconds) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paused, secondsRemaining, durationInSeconds]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  // Calculate the progress percentage
  const progress =
    ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100;

  return (
    <div className={`pr-2 ${!eventLife && "text-neutral-300 "}`}>
      <h1 className="text-2xl md:text-4xl font-extrabold my-2 relative">
        <div className="gap-4">
          <div>
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        {eventLife && paused && (
          <div className="absolute top-0 right-0 flex items-center">
            <PauseIcon className="text-yellow-500 heartbeat" />
          </div>
        )}
      </h1>

      {eventLife ? (
        <Progress
          value={progress}
          className={`w-full`}
          color={paused ? "paused" : "active"}
        />
      ) : (
        <Progress value={0} className="w-full" />
      )}
    </div>
  );
};

export default Timer;
