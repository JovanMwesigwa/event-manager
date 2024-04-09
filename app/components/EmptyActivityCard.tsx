import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CircleDot, ClockIcon, PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import NewActivityBtn from "../(main)/event/NewActivityBtn";
import TimePickerDemo from "./Inputs/TimePickerDemo";
import useCreateActivity from "@/hooks/reactquery/useCreateActivity";
import { Activity } from "@prisma/client";

const EmptyEventCard = ({ eventId }: { eventId: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const eventLife = true; // Assume the event is active for static data
  const progress = 0; // 50% progress for static data

  const [title, setTitle] = useState("Add a title to your activity");
  const [editTitle, setEditTitle] = useState(false);
  const [editTitleTwo, setEditTitleTwo] = useState(false);

  const [description, setDescription] = useState(
    "Add a description to your activity"
  );
  const [editDescription, setEditDescription] = useState(false);

  const [host, setHost] = useState("Add a Speaker");
  const [editHost, setEditHost] = useState(false);
  const [editHostTwo, setEditHostTwo] = useState(false);

  const [time, setTime] = useState("00:00:00");
  const [editTime, setEditTime] = useState(false);

  const [selectedHour, setSelectedHour] = useState<string>("01");
  const [selectedMinute, setSelectedMinute] = useState<string>("30");
  const [seconds, setSeconds] = useState<string>("00");

  const [duration, setDuration] = useState<string>("01:30:00");

  const isEditing = editTitle || editDescription || editHost || editTime;

  const createActivity = useCreateActivity();

  const handleSubmit = () => {
    // Convert the time to seconds
    const hoursInSeconds = parseInt(selectedHour) * 3600;
    const minutesInSeconds = parseInt(selectedMinute) * 60;
    const secondsInTotal = parseInt(seconds);

    const durationInSeconds =
      hoursInSeconds + minutesInSeconds + secondsInTotal;

    // @ts-ignore
    const eventData = {
      title,
      description,
      host,
      duration: durationInSeconds.toString(),
      started: null, // Set the appropriate DateTime value
      stopped: null, // Set the appropriate DateTime value
      image: "/images/1.jpg",
      active: false,
      isReset: false,
      currentTime: "00:00:00",
      done: false,
      eventId, // Todo: Replace with the actual event ID
    } as Activity;

    // @ts-ignore
    createActivity.mutate(eventData);

    // Reset the form
    setTitle("Add a title to your activity");
    setDescription("Add a description to your activity");
    setHost("Add a Speaker");
    setTime("00:00:00");
    setSelectedHour("01");
    setSelectedMinute("30");
    setSeconds("00");
    setDuration("01:30:00");
  };

  return (
    <>
      <div
        ref={cardRef}
        className="grid md:grid-cols-12 min-h-[150px] md:min-h-[200px] md:my-4 md:gap-6"
      >
        {/* Left Side */}
        <div className="hidden md:flex flex-row col-span-3 justify-between md:w-[255px]">
          <div className="flex-col justify-between flex w-full">
            <div className="flex flex-1 flex-col relative group">
              {editTitle ? (
                <Input
                  type="text"
                  autoFocus
                  className="text-lg font-bold line-clamp-1 border-none px-0 bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // Add the ability to save the title when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditTitle(false);
                    }
                  }}
                  onBlur={(e) => setTitle(e.target.value)}
                />
              ) : (
                <h1
                  onClick={() => setEditTitle(true)}
                  className={`line-clamp-1 font-bold text-lg ${
                    !eventLife && "text-neutral-400"
                  } cursor-pointer`}
                >
                  {title}
                  <PencilIcon className="hidden group-hover:block hover:text-blue-500 absolute right-0 top-0 text-neutral-800 size-3" />
                </h1>
              )}

              <div className="group relative">
                {editHost ? (
                  <Input
                    type="text"
                    autoFocus
                    className="text-[10px] md:text-sm font-medium line-clamp-1 border-none px-0 bg-transparent"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    // Add the ability to save the host when the user presses enter
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditHost(false);
                      }
                    }}
                    onBlur={(e) => setHost(e.target.value)}
                  />
                ) : (
                  <p
                    onClick={() => setEditHost(true)}
                    className={`md:text-sm text-[10px] line-clamp-1 text-neutral-400 cursor-pointer ${
                      !eventLife && "text-neutral-400"
                    }`}
                  >
                    By: {host}
                    <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-1 text-neutral-400 size-3" />
                  </p>
                )}
              </div>
            </div>

            <div className={`gap-4 group relative cursor-pointer`}>
              <TimePickerDemo
                time={time}
                editing={editTime}
                setEditing={setEditTime}
                seconds={seconds}
                setSeconds={setSeconds}
                selectedHour={selectedHour}
                setSelectedHour={setSelectedHour}
                selectedMinute={selectedMinute}
                setSelectedMinute={setSelectedMinute}
                duration={duration}
                setDuration={setDuration}
              />
              {/* <PencilIcon className="hidden group-hover:block hover:text-blue-500 absolute right-3 top-4 text-neutral-800 size-4" /> */}
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-col items-center gap-1 ml-2">
            <CircleDot size={15} className="text-neutral-600" />
            <div className="h-full flex items-center justify-center border-[1.5px] border-dashed relative" />
          </div>
        </div>

        {/* Right side */}
        <div
          className={`rounded-md col-span-9 ml-3 flex ${
            eventLife && "relative border bg-white pl-3"
          } overflow-hidden grid grid-cols-12`}
        >
          {eventLife && (
            <div className="absolute bottom-0 left-0 h-1 md:h-2 w-full overflow-hidden">
              <Progress
                value={progress}
                className="w-full rounded-none"
                color="active"
              />
            </div>
          )}

          <div className="col-span-9 flex flex-col justify-evenly">
            <div className="flex flex-col relative group">
              {editTitleTwo ? (
                <Input
                  type="text"
                  autoFocus
                  className="text-lg font-medium  line-clamp-1 border-none px-0 bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // Add the ability to save the title when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditTitleTwo(false);
                    }
                  }}
                  onBlur={(e) => setTitle(e.target.value)}
                />
              ) : (
                <h1
                  onClick={() => setEditTitleTwo(true)}
                  className={`md:text-lg font-medium cursor-pointer ${
                    !eventLife && "text-neutral-400"
                  }`}
                >
                  {title}
                  <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-0 text-neutral-800 size-4" />
                </h1>
              )}

              <div className="group relative">
                {editDescription ? (
                  <Textarea
                    autoFocus
                    className="text-[10px] rounded-none  md:text-sm line-clamp-2 border-none px-0 bg-transparent"
                    value={description}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // Add the ability to save the description when the user presses enter
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditDescription(false);
                      }
                    }}
                    onBlur={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <p
                    onClick={() => setEditDescription(true)}
                    className={`md:text-sm text-[10px] line-clamp-2 text-neutral-400 cursor-pointer ${
                      !eventLife && "text-neutral-400"
                    }`}
                  >
                    {description}
                    <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-0 text-neutral-400 size-4" />
                  </p>
                )}
              </div>

              {/* <p className="text-[10px] md:text-sm text-neutral-400 line-clamp-2">
                {item.description}
              </p> */}
            </div>

            <div className="group relative">
              {editHostTwo ? (
                <Input
                  type="text"
                  autoFocus
                  className="text-[10px] md:text-sm font-medium line-clamp-1 border-none px-0 bg-transparent"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  // Add the ability to save the host when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditHostTwo(false);
                    }
                  }}
                  onBlur={(e) => setHost(e.target.value)}
                />
              ) : (
                <p
                  onClick={() => setEditHostTwo(true)}
                  className={`md:text-sm text-[10px] line-clamp-1 text-neutral-400 cursor-pointer ${
                    !eventLife && "text-neutral-400"
                  }`}
                >
                  By: {host}
                  <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-1 text-neutral-400 size-3" />
                </p>
              )}
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
                <h1 className="text-[10px] md:text-xs line-clamp-1">
                  Add a duration to this activity
                </h1>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex md:items-center justify-center p-4 flex-col ">
            <div className="size-24 md:size-28 bg-neutral-200 rounded-md relative">
              {/* Uploaded image here... */}
            </div>
          </div>
        </div>
      </div>

      <NewActivityBtn
        isEditing={isEditing}
        submit={handleSubmit}
        loading={createActivity.isPending}
      />
    </>
  );
};

export default EmptyEventCard;
