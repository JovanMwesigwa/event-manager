"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { siteUrl } from "@/data";
import useTimer from "@/hooks/useTimer";
import { Event } from "@prisma/client";
import { ExpandIcon, Minimize2, PauseIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function FullScreenModal({
  title,
  event,
  activity,
}: {
  event: Event;
  activity: any;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  const path = usePathname();

  const { formattedTime, isLoading, secondsRemaining } = useTimer(
    activity?.id,
    true
  );

  // const eventUrl = siteUrl + path + "/" + title.replace(/ /g, "");
  const eventUrl = siteUrl + path;

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
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          // onClick={handle.enter}
          className="border md:hidden max-w-40 border-b-2 border-b-neutral-300 bg-white flex flex-row items-center gap-2"
        >
          <ExpandIcon size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full h-screen p-0 ">
        <div className="flex justify-center items-center w-full h-screen relative bg-black flex-col">
          <Minimize2
            onClick={() => setOpen(false)}
            size={55}
            className="absolute cursor-pointer top-5 text-white right-5 p-4 z-30"
          />

          <div className="flex flex-1 h-full w-full flex-row items-center ">
            <div className="flex flex-1 h-full w-full text-white items-center justify-center ">
              {/*  */}

              <div className="relative">
                {event.isPaused && (
                  <div className="absolute top-0 bg-yellow-500 right-0 rounded-md p-1 flex items-center">
                    <PauseIcon className="text-white heartbeat size-8" />
                  </div>
                )}

                {!activity.id ? (
                  <h1 className="text-white font-extrabold text-8xl md:text-9xl ">
                    00&middot;00&middot;00
                  </h1>
                ) : (
                  <h1
                    className={`${
                      isEndingSoon ? "text-red-500 minheartbeat" : "text-white"
                    }  font-extrabold text-8xl md:text-[300px]`}
                  >
                    {!isLoading && <>{formattedTime ? formattedTime : "N/A"}</>}
                  </h1>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-1/5 gap-4 flex  flex-col bg-green-500">
            <div className="w-full h-5  relative">
              <Progress
                value={progress}
                // color="ended"
                className="absolute rounded-none w-full h-full"
                color={
                  isEndingSoon ? "ended" : event.isPaused ? "paused" : "ended"
                }
              />
            </div>

            <div className="flex flex-col p-4 text-black">
              {!activity.title ? (
                <>
                  <p>{title}</p>
                  <h1 className="text-2xl font-extrabold ">
                    Event will start soon
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-extrabold line-clamp-1 ">
                    {activity.title}
                  </h1>

                  <div className="flex flex-row items-center gap-x-2">
                    <h3 className="text-lg">By</h3>
                    <div className="flex flex-row w-full items-center gap-1">
                      <h3 className="text-xl font-bold underline line-clamp-1">
                        {activity.host}
                      </h3>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
