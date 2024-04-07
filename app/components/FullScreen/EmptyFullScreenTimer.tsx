"use client";

import { Progress } from "@/components/ui/progress";
import { PauseIcon } from "lucide-react";

const EmptyFullScreenTimer = ({}: {}) => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-black flex-col">
      <div className="flex flex-1 h-full w-full flex-row items-center ">
        <div className="flex flex-1 h-full w-full items-center justify-center ">
          <div className="relative">
            <h1 className="text-white font-extrabold text-[300px] ">
              00&middot;00&middot;00
            </h1>

            <div className="absolute top-0 right-0 rounded-md p-1 flex items-center">
              <PauseIcon className="text-white heartbeat size-14" />
            </div>
          </div>
        </div>

        {/* <div className="h-full w-1/5 bg-neutral-800 p-4 flex flex-col"></div> */}
      </div>

      <div className="w-full h-1/5 gap-4 flex  flex-col bg-green-500">
        <div className="w-full h-5  relative">
          <Progress
            value={1}
            // color="ended"
            className="absolute rounded-none w-full h-full"
            color="ended"
          />
        </div>

        <div className="flex flex-col p-4">
          <h1 className="text-5xl font-extrabold ">Event will start soon...</h1>

          <div className="flex flex-row items-center gap-4">
            <h3 className="text-2xl">By</h3>
            <div className="flex flex-row w-full items-center gap-1">
              <h3 className="text-2xl font-bold underline">EventManager+</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFullScreenTimer;
