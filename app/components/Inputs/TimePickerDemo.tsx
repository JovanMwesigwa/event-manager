import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hours } from "@/data";
import { Dot, PencilIcon } from "lucide-react";
import { useState } from "react";

export default function TimePickerDemo({
  time,
  editing,
  setEditing,

  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  seconds,
  setSeconds,
  duration,
  setDuration,
}: {
  time: string | number;
  editing: boolean;
  setEditing: (value: boolean) => void;
  selectedHour: string;
  setSelectedHour: (value: string) => void;
  selectedMinute: string;
  setSelectedMinute: (value: string) => void;
  seconds: string;
  setSeconds: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
}) {
  return (
    <>
      {editing ? (
        <div className="flex items-center w-full flex-row ">
          <Input
            type="number"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            min={0}
            max={23}
            autoFocus
            defaultValue={selectedHour}
            className="bg-transparent text-5xl items-center font-extrabold p-1 border-none"
          />
          <Input
            type="number"
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
            min={0}
            max={23}
            defaultValue={selectedMinute}
            autoFocus
            className="bg-transparent text-5xl items-center font-extrabold p-1 border-none"
          />
          <Input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            defaultValue={seconds}
            min={0}
            max={23}
            autoFocus
            className="bg-transparent text-5xl items-center font-extrabold p-1 border-none"
          />
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="flex items-center w-full flex-row group relative cursor-pointer"
        >
          <div className="relative">
            <h1 className="text-2xl md:text-5xl font-extrabold relative cursor-pointer">
              {selectedHour}
            </h1>
          </div>

          <Dot size={24} />

          <div className="">
            <h1 className="text-2xl md:text-5xl font-extrabold relative cursor-pointer">
              {selectedMinute}
            </h1>
          </div>

          <Dot size={24} />

          <div className="">
            <h1 className="text-2xl md:text-5xl font-extrabold relative cursor-pointer">
              {seconds}
            </h1>
          </div>
          <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-1 text-neutral-900 size-3" />
        </div>
      )}
    </>
  );
}
