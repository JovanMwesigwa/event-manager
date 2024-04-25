import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/user-store";
import { Trophy, Users2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const { user } = useUserStore();

  return (
    <div className=" h-full col-span-6 mt-0 md:col-span-2 flex flex-col gap-y-5">
      <div className="w-full h-20 bg-white rounded-md p-4 flex flex-row items-center justify-between border ">
        <div className="flex flex-row items-center gap-x-2 flex-1">
          <div className="size-9 rounded-full flex items-center justify-center bg-neutral-900">
            <h1 className="text-lg">🏆</h1>
          </div>
          <div className="flex flex-col ">
            <h1 className="font-bold">Free plan</h1>
            <p className="text-xs font-medium">Up-to 3 events</p>
          </div>
        </div>

        {/* Upgrade btn */}
        <Button
          className=" h-8 text-xs border bg-gradient-to-r  font-bold from-red-500 to-orange-500 rounded-sm text-white flex flex-row gap-x-2"
          variant="ghost"
          onClick={() => console.log("test")}
        >
          Upgrade
          {/* <Trophy size={16} className="text-black" /> */}
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
            className=" h-8 text-xs border rounded-sm border-b-2 bg-white text-blue-400  border-b-blue-400 flex flex-row gap-x-2"
            variant="ghost"
            onClick={() => console.log("test")}
          >
            Add team
            <Users2 size={16} className="text-blue-500" />
          </Button>
        </div>

        {/*  */}
        <div className="flex flex-row w-full">
          <div className="flex flex-row gap-x-2 flex-1 items-center">
            <div className="size-6 rounded-full relative overflow-hidden bg-neutral-300">
              {user?.imageUrl && (
                <Image src={user.imageUrl} fill alt="User image" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.fullName}</p>
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
