"use client";

import React, { useEffect, useState } from "react";
import useTimer from "@/hooks/useTimer";
import { PauseIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import { jumpToNextActivity } from "@/actions/activity"; // Import the function you want to call
import { useEventActions } from "@/hooks/useEventActions";

interface TimerProps {
  activityId: string;
  paused: boolean;
  durationInSeconds: number;
  eventLife: boolean;
  currentTime: string;
  eventId: number; // Assume you have an eventId to use in the jumpToNextActivity function
  isEndingSoon: boolean;
}

const Timer: React.FC<TimerProps> = ({
  activityId,
  paused,
  durationInSeconds,
  eventLife,
  currentTime,
  eventId,
  isEndingSoon,
}) => {
  const { formattedTime, isLoading, secondsRemaining } = useTimer(activityId);

  // const { jumpToNextActivityMutation } = useEventActions({ eventId, paused });

  // // State to track if the initial load is complete
  // const [initialized, setInitialized] = useState(false);

  // useEffect(() => {
  //   if (!initialized) {
  //     setInitialized(true);
  //     return;
  //   }

  //   const handler = setTimeout(() => {
  //     if (
  //       secondsRemaining === 0 &&
  //       !paused &&
  //       eventLife &&
  //       !jumpToNextActivityMutation.isPending &&
  //       !jumpToNextActivityMutation.isError
  //     ) {
  //       jumpToNextActivityMutation.mutate();
  //     }
  //   }, 1000); // Delay the execution by 1 second to prevent immediate jumping

  //   return () => clearTimeout(handler);
  // }, [secondsRemaining, eventId, paused, eventLife, initialized]);

  const progress =
    eventLife && !isLoading && durationInSeconds > 0
      ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
      : 0;

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
          className="w-full hidden md:block"
          color={isEndingSoon ? "ended" : paused ? "paused" : "active"}
        />
      ) : (
        <Progress value={0} className="w-full hidden md:block" />
      )}
    </div>
  );
};

export default Timer;
