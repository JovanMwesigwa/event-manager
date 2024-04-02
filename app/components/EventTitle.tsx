import React from "react";
import TestTimer from "./TestTimer";

const EventTitle = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full ">
      <h1 className="text-2xl font-bold text-neutral-800">
        Starknet Kampala 2.0
      </h1>

      <div className="flex items-center gap-2">
        <p className="text-sm text-neutral-500">In progress</p>
        <span className="relative flex size-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full size-4 bg-red-500"></span>
        </span>
        {/* <TestTimer /> */}
      </div>
    </div>
  );
};

export default EventTitle;
