"use client";

import EmptyEventCard from "@/app/components/EmptyActivityCard";
import EventCard from "@/app/components/EventCard";
import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import { useParams } from "next/navigation";
import NewActivityBtn from "../NewActivityBtn";
import useUserStore from "@/stores/user-store";

const EventPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useGetEvent(Number(id));

  const { user } = useUserStore();

  if (!data || isLoading || isError) {
    return (
      <>
        {/* <NewActivityForm /> */}
        <NewActivityBtn isEditing={false} submit={() => {}} />
      </>
    );
  }

  const isAdmin = !user?.id;

  return (
    <>
      {/* header */}
      <EventTitle event={data} />

      {data.activities?.map((activity) => (
        <EventCard key={activity.id} item={activity} />
      ))}

      {/* <NewActivityForm /> */}

      {!isAdmin && <EmptyEventCard eventId={data.id} />}
    </>
  );
};

export default EventPage;
