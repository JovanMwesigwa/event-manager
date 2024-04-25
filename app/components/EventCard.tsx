import EventSheet from "@/app/components/EventSheet";
import Timer from "@/components/Timer";
import { Progress } from "@/components/ui/progress";
import useTimer from "@/hooks/useTimer";
import { useEventActivityStore } from "@/stores/active-store";
import useUserStore from "@/stores/user-store";
import { Activity } from "@prisma/client";
import { AlignStartVertical, CircleDot, ClockIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DeleteActivityPop from "./Pops/DeleteActivityPop";
import CardButtons from "./buttons/CardButtons";
import AddPollSheet from "./AddPollSheet";
import { thumnailUrl } from "@/data";
import EditingCard from "./EditingCard";

const EventCard = ({ item }: { item: Activity }) => {
  const { secondsRemaining, isLoading } = useTimer(item.id.toString());
  const eventLife = item.active;
  const cardRef = useRef<HTMLDivElement>(null);

  const { setEventId, setActiveActivityId } = useEventActivityStore();

  const [editingActivity, setEditingActivity] = useState(false);

  const { user } = useUserStore();

  useEffect(() => {
    if (eventLife && cardRef.current) {
      setEventId(item.eventId);
      setActiveActivityId(item.id);

      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [eventLife]);

  const durationInSeconds = Number(item.duration);
  const progress =
    !isLoading && durationInSeconds > 0
      ? ((durationInSeconds - secondsRemaining) / durationInSeconds) * 100
      : 0;

  const isEndingSoon =
    !isLoading &&
    secondsRemaining <= durationInSeconds * 0.1 &&
    eventLife &&
    !item.isPaused;

  // check if user object is empty
  const isAdmin = !user?.id;

  return (
    <>
      {editingActivity ? (
        <EditingCard
          activity={item}
          eventId={item.eventId}
          setEdit={setEditingActivity}
        />
      ) : (
        <>
          <div
            ref={cardRef}
            // onClick={() => setEditingActivity(!editingActivity)}
            className="grid md:grid-cols-12 min-h-[150px]   md:min-h-[200px] md:my-4 md:gap-6 "
          >
            {/* Left Side */}
            <div className="hidden md:flex flex-row col-span-3 justify-between md:w-[255px] ">
              <div className=" flex-col justify-between flex w-full  ">
                <div className="flex flex-1 flex-col">
                  <h1
                    className={`line-clamp-1 ${
                      !eventLife && "text-neutral-400"
                    }`}
                  >
                    {item.title}
                  </h1>
                  <p className="text-neutral-400 text-sm line-clamp-1">
                    By: {item.host}
                  </p>
                </div>

                {!isAdmin && (
                  <CardButtons
                    eventId={item.eventId}
                    activityId={item.id}
                    paused={item.isPaused}
                  />
                )}

                <Timer
                  activityId={item.id.toString()}
                  paused={item.isPaused}
                  durationInSeconds={durationInSeconds}
                  eventLife={eventLife}
                  currentTime={item.currentTime}
                  eventId={item.eventId}
                  isEndingSoon={isEndingSoon}
                />
              </div>

              {/* Icons */}
              <div className="flex flex-col items-center gap-1 ml-2">
                <CircleDot size={15} className={`text-neutral-600`} />
                <div
                  className={`h-full flex items-center justify-center border-[1.5px]  border-dashed relative `}
                />
              </div>
            </div>

            {/* Right side */}
            <div
              className={`rounded-md  col-span-9  md:ml-3 ${
                eventLife && " relative border bg-white pl-3 "
              } overflow-hidden grid grid-cols-12 `}
            >
              {eventLife && (
                <div
                  className={`absolute bottom-0 left-0 h-1 md:h-2 w-full overflow-hidden`}
                >
                  <Progress
                    value={progress}
                    className="w-full rounded-none"
                    // color={item.isPaused ? "paused" : "active"}
                    color={
                      isEndingSoon
                        ? "ended"
                        : item.isPaused
                        ? "paused"
                        : "active"
                    }
                  />
                </div>
              )}

              <div className="col-span-9 flex flex-col justify-evenly">
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
                        src={thumnailUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    )}
                  </div>

                  <div className="w-full">
                    <h1
                      className={`${
                        !eventLife ? "text-neutral-400" : " text-neutral-800"
                      } md:text-sm text-[11px] line-clamp-1`}
                    >
                      By {item.host}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 md:flex">
                  {/* <ClockIcon
                className={`hidden md:block md:size-5 ${
                  !eventLife ? "text-neutral-400" : " text-green-500"
                }`}
              /> */}
                  <div
                    className={`flex flex-row gap-2 ${
                      !eventLife ? "text-neutral-400" : " text-neutral-800"
                    }`}
                  >
                    {/* <h1 className="text-[10px] md:text-xs line-clamp-1 ">
                  Starts 05:00 AM, ends 12:00 PM
                </h1> */}
                    <div className="flex flex-row items-center gap-x-1">
                      <AlignStartVertical className="size-3" />
                      <h1 className="text-[10px] md:text-xs line-clamp-1 ">
                        {/* @ts-ignore */}
                        {item.pollCount} Poll(s)
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex items-end md:justify-end justify-between p-4   flex-col">
                {!isAdmin && !eventLife && (
                  <div className="flex p-0 justify-end  w-full">
                    <DeleteActivityPop
                      activityId={item.id}
                      setEdit={setEditingActivity}
                    />
                  </div>
                )}

                <div className="block md:hidden"></div>

                <div className="size-14 md:size-28 bg-neutral-200 rounded-md  relative">
                  {eventLife && (
                    <Image
                      src={thumnailUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  )}
                </div>

                {!isAdmin ? (
                  <AddPollSheet event={item} />
                ) : (
                  <EventSheet event={item} />
                )}
              </div>
            </div>
          </div>

          <div
            className={`w-full flex-row items-center  md:hidden justify-between md:mb-6 ${
              !eventLife && "text-neutral-300"
            }`}
          >
            <div className="flex items-end justify-end">
              <Timer
                activityId={item.id.toString()}
                paused={item.isPaused}
                durationInSeconds={durationInSeconds}
                eventLife={eventLife}
                currentTime={item.currentTime}
                eventId={item.eventId}
                isEndingSoon={isEndingSoon}
              />
            </div>
            {!isAdmin && (
              <CardButtons
                eventId={item.eventId}
                activityId={item.id}
                paused={item.isPaused}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EventCard;
