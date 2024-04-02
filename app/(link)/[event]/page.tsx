import EventTitle from "@/app/components/EventTitle";
import { CircleDot } from "lucide-react";
import React from "react";
import EventCard from "./EventCard";
import { activities } from "@/data";

const EventPage = () => {
  return (
    <div className="max-w-[998px] mx-auto flex flex-1 flex-col w-full lg:flex-grow py-8 gap-2 md:px-0 px-4">
      {/* header */}
      <EventTitle />

      {activities.map((activity) => (
        <EventCard key={activity.id} item={activity} />
      ))}
    </div>
  );
};

export default EventPage;
