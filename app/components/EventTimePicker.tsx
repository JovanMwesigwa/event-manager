"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Timekeeper from "react-timekeeper";

export function EventTimePicker({ close }: { close: any }) {
  const [value, onChange] = useState<any>("10:00");

  return (
    <div className="absolute bg-white top-0 p-2">
      <Timekeeper
        switchToMinuteOnHourSelect
        time={value}
        closeOnMinuteSelect={true}
        onChange={(newTime: any) => {
          onChange(newTime.formatted12);
          close(false);
        }}
      />

      {/* <div className="w-full p-2 flex flex-row items-center justify-end"></div> */}
    </div>
  );
}
