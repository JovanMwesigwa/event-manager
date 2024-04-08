"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useGetActiveActivity from "@/hooks/reactquery/useGetActiveActivity";
import useTimer from "@/hooks/useTimer";
import { Activity, Event } from "@prisma/client";
import { ExpandIcon, PauseIcon } from "lucide-react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import EmptyFullScreenTimer from "./EmptyFullScreenTimer";

const FullScreenTimer = ({
  event,
  activity,
}: {
  event: Event;
  activity: any;
}) => {
  const handle = useFullScreenHandle();

  const { formattedTime, isLoading, secondsRemaining } = useTimer(
    activity?.id,
    true
  );

  // if (!activity) return;

  const durationInSeconds = Number(activity.duration);

  const progress =
    event.active && !isLoading && activity.duration > 0
      ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
      : 0;

  const isEndingSoon =
    !isLoading &&
    secondsRemaining <= durationInSeconds * 0.3 &&
    event.active &&
    !activity.isPaused;

  return (
    <div>
      <Button
        variant="ghost"
        onClick={handle.enter}
        className="border max-w-40 border-b-2 border-b-neutral-300 bg-white flex flex-row items-center gap-2"
      >
        <ExpandIcon size={15} />
      </Button>

      <FullScreen handle={handle}>
        <>
          {handle.active &&
            (!activity.id ? (
              <EmptyFullScreenTimer />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-white flex-col">
                <div className="flex flex-1 h-full w-full flex-row items-center">
                  <div className="flex flex-1 h-full w-full items-center justify-center ">
                    <div className="relative">
                      <h1
                        className={`${
                          isEndingSoon
                            ? "text-red-500 minheartbeat"
                            : "text-black"
                        }  font-extrabold text-[300px]`}
                      >
                        {!isLoading && (
                          <>{formattedTime ? formattedTime : "N/A"}</>
                        )}
                      </h1>

                      {event.isPaused && (
                        <div className="absolute top-0 right-0 rounded-md p-1 flex items-center">
                          <PauseIcon className="text-white heartbeat size-14" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div className="h-full w-1/5 bg-neutral-800 p-4 flex flex-col"></div> */}
                </div>

                <div className="w-full h-1/5 gap-4 flex  flex-col bg-green-500">
                  <div className="w-full h-5  relative">
                    <Progress
                      value={progress}
                      // color="ended"
                      className="absolute rounded-none w-full h-full"
                      color={
                        isEndingSoon
                          ? "ended"
                          : event.isPaused
                          ? "paused"
                          : "ended"
                      }
                    />
                  </div>

                  <div className="flex flex-col p-4 text-white">
                    <h1 className="text-5xl font-extrabold ">
                      {activity.title}
                    </h1>

                    <div className="flex flex-row items-center gap-4">
                      <h3 className="text-2xl">By</h3>
                      <div className="flex flex-row w-full items-center gap-1">
                        <h3 className="text-2xl font-bold underline">
                          {activity.host}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      </FullScreen>
    </div>
  );
};

export default FullScreenTimer;
