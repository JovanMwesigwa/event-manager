"use client";

import { Event } from "@prisma/client";
import ActionButtons from "./buttons/ActionButtons";
import { useTimerStore } from "@/stores/timer-store"; // Import your timer store

const EventTitle = ({ event }: { event: Event }) => {
  const secondsRemaining = useTimerStore((state) => state.secondsRemaining); // Get the timer value from the store

  // Format the seconds into a readable time format
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <h1 className="text-2xl font-bold text-neutral-800">{event.title}</h1>
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-sm text-neutral-600 font-bold">{formattedTime}</h1>{" "}
        {event.active && !event.isPaused && (
          <div className="flex items-center gap-2">
            <span className="relative flex size-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-4 bg-red-500"></span>
            </span>
          </div>
        )}
        {/* Display the formatted timer */}
      </div>
    </div>
  );
};

export default EventTitle;
