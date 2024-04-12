"use client";

import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import { useParams } from "next/navigation";
import EventCard from "../../../components/EventCard";

const EventPage = () => {
  const { event, eventId } = useParams<{ eventId: string; event: string }>();

  const { data, error, isLoading, isError } = useGetEvent(Number(eventId));

  if (!data || isLoading || isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-2xl font-bold text-neutral-400">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-[998px] mx-auto flex flex-1 flex-col w-full lg:flex-grow py-8 gap-2 md:px-0 px-4">
      {/* header */}
      <EventTitle event={data} />

      {data.activities?.map((activity) => (
        <EventCard key={activity.id} item={activity} />
      ))}
    </div>
  );
};

export default EventPage;
