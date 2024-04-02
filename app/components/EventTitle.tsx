import React from "react";
import TestTimer from "./TestTimer";

const EventTitle = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full ">
      <h1 className="text-2xl font-bold text-neutral-800">
        Starknet Kampala 2.0
      </h1>

      <div className="flex items-center gap-2">
        <p className="text-sm">Register</p>
        {/* <TestTimer /> */}
      </div>
    </div>
  );
};

export default EventTitle;
