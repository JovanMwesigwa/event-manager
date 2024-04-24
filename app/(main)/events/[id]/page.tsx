"use client";

import EmptyEventCard from "@/app/components/EmptyActivityCard";
import EventCard from "@/app/components/EventCard";
import EventTitle from "@/app/components/EventTitle";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import { useParams } from "next/navigation";
import NewActivityBtn from "../NewActivityBtn";
import useUserStore from "@/stores/user-store";
import { Loader } from "lucide-react";

const EventPage = () => {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useGetEvent(Number(id));

  const { user } = useUserStore();

  const isAdmin = !user?.id;

  if (!data || isLoading || isError) {
    return (
      <>
        {isAdmin ? (
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-2xl font-bold text-neutral-400">
              <Loader className="siz-8 animate-spin" />
            </h1>
          </div>
        ) : (
          <NewActivityBtn isEditing={false} submit={() => {}} />
        )}
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

      {!isAdmin && <EmptyEventCard eventId={data.id} />}
    </>
  );
};

export default EventPage;
