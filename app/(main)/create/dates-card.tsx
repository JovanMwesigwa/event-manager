import { Input } from "@/components/ui/input";
import React from "react";

const EventDatesCard = () => {
  return (
    <div className="flex w-full items-center justify-between  ml-3 mb-5">
      {/* Start and end */}
      <div className="flex flex-1 justify-between h-full flex-col gap-3 p-4 bg-slate-200 rounded-md ">
        <div className="w-full h-full items-center flex flex-row justify-between">
          <h1>Start</h1>

          <div className=" items-center justify-end  flex flex-row">
            <Input
              className="w-1/2 h-full bg-slate-100 border-b-4 border-b-slate-300 text-neutral-700"
              placeholder="Monday, 8 Apr"
            />
            <Input
              className="w-1/4 h-full bg-slate-100 border-b-4 border-b-slate-300 text-neutral-700"
              placeholder="12:00 PM"
            />
          </div>
        </div>

        <div className="w-full h-full  items-center justify-between flex flex-row">
          <h1>End</h1>

          <div className=" items-center justify-end flex flex-row">
            <Input
              className="w-1/2 h-full bg-slate-100   border-b-4 border-b-slate-300 text-neutral-700"
              placeholder="Monday, 8 Apr"
            />
            <Input
              className="w-1/4 h-full bg-slate-100 border-b-4 border-b-slate-300 text-neutral-700"
              placeholder="12:00 PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDatesCard;
