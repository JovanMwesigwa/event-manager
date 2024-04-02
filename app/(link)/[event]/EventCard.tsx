import EventSheet from "@/app/components/EventSheet";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { useVerticleProgress } from "@/hooks/useVerticlePorgess";
import { EventActivityType } from "@/types";
import {
  Bell,
  BellDot,
  BellDotIcon,
  ChevronRight,
  ChevronsRightIcon,
  CircleDot,
  Clock,
  ClockIcon,
} from "lucide-react";
import React from "react";

const EventCard = ({ item }: { item: EventActivityType }) => {
  const progressWidthClass = useProgress();
  const verticleProgressWidthClass = useVerticleProgress();

  return (
    <>
      <div className="grid md:grid-cols-12 min-h-[150px]   md:min-h-[200px] md:my-4 md:gap-6">
        <div className="hidden md:flex flex-row col-span-3 justify-between ">
          <div className=" flex-col justify-between flex w-full ">
            <div className="">
              <h1
                className={`line-clamp-1 ${!item.active && "text-neutral-400"}`}
              >
                {item.title}
              </h1>
              <p className="text-neutral-400 text-sm">By: {item.host}</p>
            </div>

            <div className={`pr-2 ${!item.active && "text-neutral-300 "}`}>
              <h1 className="text-2xl md:text-4xl font-extrabold my-2">
                {item.currentTime}
              </h1>
              {item.active ? (
                <Progress value={50} className="w-full" />
              ) : (
                <Progress value={0} className="w-full" />
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-col items-center gap-1">
            <CircleDot size={15} className={`text-neutral-600`} />
            <div
              className={`h-full flex items-center justify-center border-[1.5px]  border-dashed relative `}
            />
          </div>
        </div>

        <div
          className={`rounded-md  cursor-pointer col-span-9 pl-2 md:pl-4 ${
            item.active && " relative border bg-white "
          } overflow-hidden grid grid-cols-12 `}
        >
          <div className="absolute right-1 md:right-2 top-0 md:top-2 bg-white rounded-full p-1 ">
            <div className="size-1 md:block md:size-2 bg-red-500 rounded-full right-1 bottom-2 absolute" />
            <Bell className="text-red-500 size-4 md:size-5" />
          </div>

          {item.active && (
            <div
              className={`absolute bottom-0 left-0 bg-green-500 h-1 md:h-2 ${progressWidthClass}`}
            ></div>
          )}

          <div className="col-span-9 flex flex-col justify-evenly">
            <h1 className={`text-neutral-400 text-xs md:text-sm`}>
              {item.start}
            </h1>

            <div className="flex flex-col">
              <h1
                className={`md:text-lg font-medium ${
                  !item.active && "text-neutral-400"
                }`}
              >
                {item.title}
              </h1>
              <p className="text-[10px] md:text-sm text-neutral-400 line-clamp-2 ">
                {item.description}
              </p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="size-5 rounded-full bg-neutral-200"></div>

              <h1
                className={`${
                  !item.active ? "text-neutral-400" : " text-neutral-800"
                } md:text-sm text-[11px]`}
              >
                By {item.host}
              </h1>
            </div>

            <div className="flex flex-row items-center gap-2 md:flex">
              <ClockIcon
                className={`hidden md:block md:size-5 ${
                  !item.active ? "text-neutral-400" : " text-green-500"
                }`}
              />
              <div
                className={`flex flex-row gap-2 ${
                  !item.active ? "text-neutral-400" : " text-neutral-800"
                }`}
              >
                <h1 className="text-[10px] md:text-xs line-clamp-1 ">
                  Starts {item.start}, ends {item.end}, runs for {item.duration}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex md:items-center  justify-end p-4 flex-col">
            <div className=" size-14 md:size-28 bg-neutral-200 rounded-md"></div>

            <EventSheet event={item} />
          </div>
        </div>
      </div>

      <div
        className={`w-full flex-row items-center  md:hidden justify-between mb-6 ${
          !item.active && "text-neutral-300"
        }`}
      >
        <h1 className="text-xl md:text-4xl font-extrabold text-end ">
          - {item.currentTime}
        </h1>
      </div>
    </>
  );
};

export default EventCard;
