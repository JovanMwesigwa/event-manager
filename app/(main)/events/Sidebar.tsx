import { Button } from "@/components/ui/button";
import { Trophy, Users2 } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className=" h-full col-span-2 flex flex-col gap-y-5">
      <div className="w-full h-20 bg-white rounded-md p-4 flex flex-row items-center justify-between border ">
        <div className="flex flex-row items-center gap-x-2 flex-1">
          <div className="size-8 rounded-full bg-neutral-300"></div>
          <div className="flex flex-col">
            <h1 className="font-bold">Free plan</h1>
            <p className="text-xs font-medium">Up-to 3 events</p>
          </div>
        </div>

        {/* Upgrade btn */}
        <Button
          className=" h-8 text-sm border rounded-sm border-b-2 border-b-blue-400 flex flex-row gap-x-2"
          variant="ghost"
          onClick={() => console.log("test")}
        >
          Upgrade
          <Trophy size={16} className="text-orange-500" />
        </Button>
      </div>

      <div className="w-full h-36 bg-white rounded-md p-4 flex flex-col justify-between border ">
        <div className="flex flex-row w-full">
          <div className="flex flex-row gap-x-2 flex-1">
            <div className="flex flex-col">
              <h1 className="font-bold">Team Members</h1>
              <p className="text-xs font-medium">Up-to 1 team</p>
            </div>
          </div>

          {/* Upgrade btn */}
          <Button
            className=" h-8 text-sm border rounded-sm border-b-2 border-b-green-400 flex flex-row gap-x-2"
            variant="ghost"
            onClick={() => console.log("test")}
          >
            Add team
            <Users2 size={16} className="text-green-500" />
          </Button>
        </div>

        {/*  */}
        <div className="flex flex-row w-full">
          <div className="flex flex-row gap-x-2 flex-1 items-center">
            <div className="size-6 rounded-full bg-neutral-300"></div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">Joavn Mwesigwa</p>
            </div>
          </div>

          {/* Upgrade btn */}
          <p className="text-xs font-medium">Owner</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
