"use client";

import { EventDatePicker } from "@/app/components/EventDatePicker";
import { Input } from "@/components/ui/input";
import { RegisterOptions } from "react-hook-form";

const EventDatesCard = ({
  setEndDate,
  setStartDate,
  startDate,
  endDate,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: {
  startDate: Date;
  setStartDate: any;
  endDate: Date;
  setEndDate: any;
  startTime: string;
  endTime: string;
  setStartTime: any;
  setEndTime: any;
}) => {
  return (
    <div className="flex w-full items-center justify-between  ml-3 mb-5">
      {/* Start and end */}
      <div className="flex flex-1 justify-between h-full flex-col gap-3 p-4 bg-neutral-200 rounded-md ">
        <div className="w-full h-full items-center flex flex-row justify-between">
          <h1>Start</h1>

          <div className=" items-center justify-end  flex flex-row relative">
            <EventDatePicker date={startDate} setDate={setStartDate} />

            <Input
              className="w-1/4 h-full bg-white border-b-4 border-b-neutral-300 text-neutral-700"
              placeholder="09:00 AM"
              defaultValue="09:00 AM"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full h-full  items-center justify-between flex flex-row">
          <h1>End</h1>

          <div className=" items-center justify-end flex flex-row">
            <EventDatePicker date={endDate} setDate={setEndDate} />

            <Input
              className="w-1/4 h-full bg-white border-b-4 border-b-neutral-300 text-neutral-700"
              placeholder="05:00 PM"
              defaultValue="05:00 PM"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDatesCard;
