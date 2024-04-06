"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useGetActiveActivity from "@/hooks/reactquery/useGetActiveActivity";
import useTimer from "@/hooks/useTimer";
import { Activity, Event } from "@prisma/client";
import { ExpandIcon } from "lucide-react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FullScreenTimer = ({ event }: { event: Event }) => {
  const handle = useFullScreenHandle();

  //   const { formattedTime, isLoading, secondsRemaining } = useTimer("1");

  //   const { data, error, isLoading } = useGetActiveActivity();

  //   console.log("====================================");
  //   console.log("data", data);
  //   console.log("====================================");

  return (
    <div>
      <Button
        variant="ghost"
        onClick={handle.enter}
        className="border max-w-40 border-b-2 border-b-neutral-300 bg-white flex flex-row items-center gap-2"
      >
        <ExpandIcon size={15} />
      </Button>

      {/* <FullScreen handle={handle}>
        {handle.active && (
          <div className="flex justify-center items-center w-full h-full bg-black flex-col">
            <div className="flex flex-1 h-full w-full flex-row items-center">
              <div className="flex flex-1 h-full w-full items-center justify-center">
                <h1 className="text-white font-extrabold text-[350px]">
                  {!isLoading && formattedTime}
                </h1>
              </div>

              <div className="h-full w-1/5 bg-neutral-800 p-4 flex flex-col"></div>
            </div>

            <div className="w-full h-1/5 gap-4 flex  flex-col bg-green-500">
              <div className="w-full h-5  relative">
                <Progress
                  value={50}
                  color="ended"
                  className="absolute rounded-none w-full h-full"
                />
              </div>

              <div className="flex flex-col p-4">
                <h1 className="text-5xl font-extrabold ">
                  Welcome & Registration
                </h1>

                <div className="flex flex-row items-center gap-4">
                  <h3 className="text-2xl">By</h3>
                  <div className="flex flex-row w-full items-center gap-1">
                    <h3 className="text-2xl font-bold underline">
                      Dr. Philipe Luiz Casamiski
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </FullScreen> */}
    </div>
  );
};

export default FullScreenTimer;
