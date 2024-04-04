import EventSheet from "@/app/components/EventSheet";
import Timer from "@/components/Timer";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import useTimer from "@/hooks/useTimer";
import { Activity } from "@prisma/client";
import { CircleDot, ClockIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const EventCard = ({ item }: { item: Activity }) => {
  const { secondsRemaining, isLoading } = useTimer(item.id.toString());
  const eventLife = item.active;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventLife && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [eventLife]);

  const durationInSeconds = Number(item.duration);
  const progress =
    !isLoading && durationInSeconds > 0
      ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
      : 0;

  return (
    <>
      <div
        ref={cardRef}
        className="grid md:grid-cols-12 min-h-[150px]   md:min-h-[200px] md:my-4 md:gap-6"
      >
        <div className="hidden md:flex flex-row col-span-3 justify-between ">
          <div className=" flex-col justify-between flex w-full ">
            <div className="">
              <h1
                className={`line-clamp-1 ${!eventLife && "text-neutral-400"}`}
              >
                {item.title}
              </h1>
              <p className="text-neutral-400 text-sm">By: {item.host}</p>
            </div>

            <Timer
              activityId={item.id.toString()}
              paused={item.isPaused}
              durationInSeconds={durationInSeconds}
              eventLife={eventLife}
              currentTime={item.currentTime}
            />
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
            eventLife && " relative border bg-white "
          } overflow-hidden grid grid-cols-12 `}
        >
          {/* <div className="absolute right-1 md:right-2 top-0 md:top-2 bg-white rounded-full p-1 ">
            <div className="size-1 md:block md:size-2 bg-red-500 rounded-full right-1 bottom-2 absolute" />
            <Bell className="text-red-500 size-4 md:size-5" />
          </div> */}

          {eventLife && (
            <div
              className={`absolute bottom-0 left-0 h-1 md:h-2 w-full overflow-hidden`}
            >
              <Progress
                value={progress}
                className="w-full rounded-none"
                color={item.isPaused ? "paused" : "active"}
              />
            </div>
          )}

          <div className="col-span-9 flex flex-col justify-evenly">
            <h1 className={`text-neutral-400 text-xs md:text-sm`}>
              {/* {item.started} */}
            </h1>

            <div className="flex flex-col">
              <h1
                className={`md:text-lg font-medium ${
                  !eventLife && "text-neutral-400"
                }`}
              >
                {item.title}
              </h1>
              <p className="text-[10px] md:text-sm text-neutral-400 line-clamp-2 ">
                {item.description}
              </p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="size-5 rounded-full bg-neutral-200 relative overflow-hidden">
                {eventLife && (
                  <Image
                    src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/event-covers/ba/32c7dea4-d373-4d62-abf7-70e2482187d1"
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                )}
              </div>

              <h1
                className={`${
                  !eventLife ? "text-neutral-400" : " text-neutral-800"
                } md:text-sm text-[11px]`}
              >
                By {item.host}
              </h1>
            </div>

            <div className="flex flex-row items-center gap-2 md:flex">
              <ClockIcon
                className={`hidden md:block md:size-5 ${
                  !eventLife ? "text-neutral-400" : " text-green-500"
                }`}
              />
              <div
                className={`flex flex-row gap-2 ${
                  !eventLife ? "text-neutral-400" : " text-neutral-800"
                }`}
              >
                <h1 className="text-[10px] md:text-xs line-clamp-1 ">
                  Starts 05:00 AM, ends 12:00 PM, runs for {item.duration}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex md:items-center  justify-end p-4 flex-col">
            <div className=" size-14 md:size-28 bg-neutral-200 rounded-md relative">
              {eventLife && (
                <Image
                  src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/event-covers/ba/32c7dea4-d373-4d62-abf7-70e2482187d1"
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              )}
            </div>

            <EventSheet event={item} />
          </div>
        </div>
      </div>

      <div
        className={`w-full flex-row items-center  md:hidden justify-between mb-6 ${
          !eventLife && "text-neutral-300"
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
