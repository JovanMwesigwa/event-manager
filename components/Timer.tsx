// src/components/Timer.tsx
"use client";

import React, { useEffect } from "react";
import { useTimerStore } from "@/stores/timer-store";
import { PauseIcon } from "lucide-react";
import { Progress } from "./ui/progress";

interface TimerProps {
  activityId: number;
  paused: boolean;
  durationInSeconds: number;
  eventLife: boolean;
  currentTime: number | string;
}

const Timer: React.FC<TimerProps> = ({
  activityId,
  paused,
  durationInSeconds,
  eventLife,
  currentTime,
}) => {
  const secondsRemaining = useTimerStore((state) => state.secondsRemaining);
  const setSecondsRemaining = useTimerStore(
    (state) => state.setSecondsRemaining
  );

  useEffect(() => {
    setSecondsRemaining(durationInSeconds);
  }, [durationInSeconds, setSecondsRemaining]);

  useEffect(() => {
    let interval: number | undefined;
    if (!paused && eventLife) {
      interval = window.setInterval(() => {
        setSecondsRemaining((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paused, eventLife, setSecondsRemaining]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const progress =
    ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100;

  const threshold = Math.min(10, durationInSeconds * 0.3);
  const isEndingSoon = secondsRemaining <= threshold && eventLife && !paused;

  return (
    <div className={`pr-2 ${!eventLife && "text-neutral-300"}`}>
      <h1 className="text-2xl md:text-5xl font-extrabold my-2 relative">
        {!eventLife ? (
          <>{currentTime}</>
        ) : (
          <>
            <div
              className={`gap-4 ${
                isEndingSoon ? "text-red-500 minheartbeat" : ""
              }`}
            >
              {hours.toString().padStart(2, "0")}:
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>
            {eventLife && paused && (
              <div className="absolute top-0 right-0 bg-yellow-500 rounded-md p-1 flex items-center">
                <PauseIcon className="text-white heartbeat size-5" />
              </div>
            )}
          </>
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
