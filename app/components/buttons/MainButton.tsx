"use client";

import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import React from "react";

const MainButton = ({
  active,
  title,
  handleClick,
  loading,
  Icon = RocketIcon,
}: {
  title: string;
  handleClick: any;
  loading: boolean;
  active: boolean;
  Icon: any;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      disabled={loading}
      className={`border max-w-40 border-b-2 p-3 border-b-neutral-300 bg-white flex flex-row items-center gap-2 ${
        active && "border-b-green-500"
      }  `}
    >
      <div className="bg-green-200 p-1 rounded-md">
        <Icon size={16} className="text-green-600" />
      </div>

      {/* {!loading`` && event.active ? formattedTime : "Start the event"} */}
      {title}
    </Button>
  );
};

export default MainButton;
