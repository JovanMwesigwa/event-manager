"use client";

import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import EventCard from "./EventCard";

const EventPage = () => {
  // const event = await upsertEvent(1);

  const { data, error, isLoading, isError } = useGetEvent();

  if (!data || isLoading || isError) {
    return <div>Event not found</div>;
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
