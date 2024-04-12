import { Trophy } from "lucide-react";
import React from "react";

const WinnerComponent = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-7xl font-extrabold text-center">Winner</h1>

      <div className="flex flex-col">
        {/* <h1 className="text-9xl font-extrabold">WINNER</h1> */}

        <div className="flex flex-row items-center gap-x-2">
          <Trophy className="text-orange-600 size-24" />
          <h1 className="text-[250px] font-extrabold heartbeat">Coke</h1>
          <Trophy className="text-orange-600 size-24" />
        </div>
      </div>
    </div>
  );
};

export default WinnerComponent;
