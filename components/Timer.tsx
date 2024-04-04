"use client";

import React from "react";
import useTimer from "@/hooks/useTimer"; // Adjust the path as necessary
import { PauseIcon } from "lucide-react";
import { Progress } from "./ui/progress";

interface TimerProps {
  activityId: string;
  paused: boolean;
  durationInSeconds: number;
  eventLife: boolean;
  currentTime: string;
}

const Timer: React.FC<TimerProps> = ({
  activityId,
  paused,
  durationInSeconds,
  eventLife,
  currentTime,
}) => {
  const { formattedTime, isLoading, secondsRemaining } = useTimer(activityId);

  // Calculate the progress percentage
  const progress =
    eventLife && !isLoading && durationInSeconds > 0
      ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
      : 0;

  const isEndingSoon =
    !isLoading &&
    secondsRemaining <= durationInSeconds * 0.3 &&
    eventLife &&
    !paused;

  return (
    <div className={`pr-2 ${!eventLife && "text-neutral-300"}`}>
      <h1 className="text-2xl md:text-5xl font-extrabold my-2 relative">
        {!eventLife ? (
          currentTime
        ) : (
          <>
            <div
              className={`gap-4 ${
                isEndingSoon ? "text-red-500 minheartbeat" : ""
              }`}
            >
              {isLoading ? (
                <span className="text-neutral-300">00:00:00</span>
              ) : (
                formattedTime ?? <span className="text-neutral-300">N/A</span>
              )}
            </div>
            {paused && (
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
