"use client";

import EventCard from "@/app/components/EventCard";
import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import NewActivityBtn from "../NewActivityBtn";
import { NewActivityForm } from "../../create/Form/NewActivity";
import EmptyEventCard from "@/app/components/EmptyActivityCard";

const EventPage = () => {
  const { data, error, isLoading, isError } = useGetEvent(1);

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
