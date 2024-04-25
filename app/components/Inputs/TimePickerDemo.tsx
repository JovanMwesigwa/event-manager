import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hours } from "@/data";
import { Dot, PencilIcon } from "lucide-react";
import { KeyboardEvent, MutableRefObject, useRef, useState } from "react";

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
  const minuteInputRef = useRef(null);
  const secondInputRef = useRef(null);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    focusNext?: React.RefObject<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      focusNext?.current?.focus();
    }
  };

  // Utility function to clamp the value within specified range
  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  };

  // Utility function to format the number to two digits
  const formatToTwoDigits = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  // Utility function to clamp and format the value
  const clampAndFormat = (value: string, min: number, max: number): string => {
    const num = parseInt(value, 10);
    const clampedNum = Math.max(min, Math.min(max, num));
    return formatToTwoDigits(clampedNum);
  };

  // Handlers for input changes
  const handleHourChange = (value: string) => {
    const formattedValue = clampAndFormat(value, 0, 23);
    setSelectedHour(formattedValue);
  };

  const handleMinuteOrSecondChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const formattedValue = clampAndFormat(value, 0, 59);
    setter(formattedValue);
  };

  return (
    <>
      {editing ? (
        <div className="flex items-center w-full flex-row gap-x-3">
          <Input
            type="number"
            value={selectedHour}
            onChange={(e) => handleHourChange(e.target.value)}
            onBlur={(e) => handleHourChange(e.target.value)}
            min={0}
            max={23}
            autoFocus
            defaultValue={selectedHour}
            onKeyDown={(e) => handleKeyDown(e, minuteInputRef)}
            className="bg-neutral-100 h-14 flex text-5xl rounded-sm items-center font-extrabold p-1 border-none"
          />
          <Input
            type="number"
            ref={minuteInputRef}
            value={selectedMinute}
            onChange={(e) =>
              handleMinuteOrSecondChange(e.target.value, setSelectedMinute)
            }
            onBlur={(e) =>
              handleMinuteOrSecondChange(e.target.value, setSelectedMinute)
            }
            min={0}
            max={23}
            defaultValue={selectedMinute}
            autoFocus
            onKeyDown={(e) => handleKeyDown(e, secondInputRef)}
            className="bg-neutral-100 h-14 flex text-5xl rounded-sm items-center font-extrabold p-1 border-none"
          />
          <Input
            type="number"
            ref={secondInputRef}
            value={seconds}
            onChange={(e) =>
              handleMinuteOrSecondChange(e.target.value, setSeconds)
            }
            onBlur={(e) =>
              handleMinuteOrSecondChange(e.target.value, setSeconds)
            }
            defaultValue={seconds}
            min={0}
            max={23}
            autoFocus
            onKeyDown={(e) => handleKeyDown(e)}
            className="bg-neutral-100 h-14 flex text-5xl rounded-sm items-center font-extrabold p-1 border-none"
          />
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="flex items-center w-full flex-row group relative cursor-pointer text-neutral-400"
        >
          <div className="relative">
            <h1 className="text-2xl md:text-5xl font-extrabold hover:text-neutral-500 relative cursor-pointer">
              {selectedHour}
            </h1>
          </div>

          <Dot size={24} />

          <div className="">
            <h1 className="text-2xl md:text-5xl font-extrabold hover:text-neutral-500 relative cursor-pointer">
              {selectedMinute}
            </h1>
          </div>

          <Dot size={24} />

          <div className="">
            <h1 className="text-2xl md:text-5xl font-extrabold hover:text-neutral-500 relative cursor-pointer">
              {seconds}
            </h1>
          </div>
          <PencilIcon className="hidden group-hover:block absolute hover:text-blue-500 right-0 top-1 text-neutral-900 size-3" />
        </div>
      )}
    </>
  );
}
