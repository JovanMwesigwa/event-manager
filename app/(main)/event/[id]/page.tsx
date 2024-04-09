"use client";

import EmptyEventCard from "@/app/components/EmptyActivityCard";
import EventCard from "@/app/components/EventCard";
import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import { useParams } from "next/navigation";
import NewActivityBtn from "../NewActivityBtn";

const EventPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useGetEvent(Number(id));

  if (!data || isLoading || isError) {
    return (
      <>
        {/* <NewActivityForm /> */}
        <NewActivityBtn isEditing={false} submit={() => {}} />
      </>
    );
  }

  return (
    <>
      {/* header */}
      <EventTitle event={data} />

      {data.activities?.map((activity) => (
        <EventCard key={activity.id} item={activity} />
      ))}

      {/* <NewActivityForm /> */}

      <EmptyEventCard eventId={data.id} />
    </>
  );
};

export default EventPage;
