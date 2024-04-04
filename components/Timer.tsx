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

  // Determine if the timer is about to end
  const threshold = Math.min(10, durationInSeconds * 0.3); // 10 seconds or 10% of total time, whichever is larger
  const isEndingSoon =
    secondsRemaining <= threshold &&
    secondsRemaining > 0 &&
    eventLife &&
    !paused;

  return (
    <div className={`pr-2 ${!eventLife && "text-neutral-300 "}`}>
      <h1 className="text-2xl md:text-5xl font-extrabold my-2 relative">
        <div
          className={`gap-4 ${isEndingSoon ? "text-red-500 minheartbeat" : ""}`}
        >
          <div>
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        {eventLife && paused && (
          <div className="absolute top-0 right-0 b bg-yellow-500 rounded-md p-1 flex items-center">
            <PauseIcon className="text-white heartbeat size-5" />
          </div>
        )}
      </h1>

      {eventLife ? (
        <Progress
          value={progress}
          className="w-full"
          color={isEndingSoon ? "ended" : paused ? "paused" : "active"}
        />
      ) : (
        <Progress value={0} className="w-full" />
      )}
    </div>
  );
};

export default Timer;
