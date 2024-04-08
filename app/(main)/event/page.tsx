"use client";

import EventCard from "@/app/components/EventCard";
import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";

const EventPage = () => {
  const { data, error, isLoading, isError } = useGetEvent(1);

  if (!data || isLoading || isError) {
    return <div>Event not found</div>;
  }

  return (
    <>
      {/* header */}
      <EventTitle event={data} />

      {data.activities?.map((activity) => (
        <EventCard key={activity.id} item={activity} />
      ))}
    </>
  );
};

export default EventPage;
