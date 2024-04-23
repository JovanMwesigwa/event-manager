"use client";

import { Progress } from "@/components/ui/progress";
import { thumnailUrl } from "@/data";
import useTimer from "@/hooks/useTimer";
import { PauseIcon, Trophy } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

const EmptyFullScreenPage = () => {
  const { id } = useParams();

  const path = usePathname();

  // const { formattedTime, isLoading, secondsRemaining } = useTimer(
  //   activity?.id,
  //   true
  // );

  // // const eventUrl = siteUrl + path + "/" + title.replace(/ /g, "");

  // // if (!activity) return;

  // const durationInSeconds = Number(activity.duration);

  // const progress =
  //   event.active && !isLoading && activity.duration > 0
  //     ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
  //     : 0;

  // const isEndingSoon =
  //   !isLoading &&
  //   secondsRemaining <= durationInSeconds * 0.3 &&
  //   event.active &&
  //   !activity.isPaused;

  return (
    <div className="flex justify-center items-center w-full h-screen relative bg-black flex-col">
      <div className="flex flex-1 h-full w-full flex-row items-center ">
        <div className="flex flex-1 h-full w-full text-white items-center justify-center ">
          {/*  */}

          <div className="relative">
            <h1 className="text-white font-extrabold text-8xl md:text-[250px] ">
              00&middot;00&middot;00
            </h1>

            <div className="absolute top-0 right-0 rounded-md p-1 flex hidden items-center">
              <PauseIcon className="text-white heartbeat size-14" />
            </div>
          </div>
        </div>

        {/* <div className="h-full w-1/5 bg-neutral-900 absolute bottom-0  md:flex flex-col hidden right-0">
          <div className="flex flex-1 flex-col p-4">
            <h1 className="text-2xl font-bold text-white">Scan the QR</h1>
            <h1 className=" font-medium text-white">
              To follow along the event
            </h1>

            <div className="flex bg-white w-full rounded-md my-5 h-64 p-3">
              <QRCodeSVG value={eventUrl} className="w-full h-full " />
            </div>

            <div className="flex bg-white w-full rounded-md my-5 h-64 p-3 relative ">
              <Image
                src={thumnailUrl}
                layout="fill"
                objectFit="contain"
                alt="activity image"
              />
            </div>
          </div>

          <div className="w-full h-20 bg-purple-500 "></div>
        </div> */}
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

        <div className="flex flex-col bottom-0 p-4 ">
          <h1 className="text-2xl md:text-5xl font-extrabold ">
            Event will start soon...
          </h1>

          <div className="flex flex-row items-center gap-4">
            <h3 className="text-xl md:text-2xl">By</h3>
            <div className="flex flex-row w-full items-center gap-1">
              <h3 className="text-xl md:text-2xl font-bold underline">
                EventManager+
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFullScreenPage;
