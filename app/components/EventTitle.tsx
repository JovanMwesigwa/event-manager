"use client";

import { Button } from "@/components/ui/button";
import useGetActiveActivity from "@/hooks/reactquery/useGetActiveActivity";
import { useEventActions } from "@/hooks/useEventActions";
import useTimer from "@/hooks/useTimer"; // Assuming this is the path to your hook
import { useEventActivityStore } from "@/stores/active-store";
import useUserStore from "@/stores/user-store";
import { Event } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Home,
  Hourglass,
  Loader,
  Loader2Icon,
  MapPin,
  RefreshCcw,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import FullScreenTimer from "./FullScreen/FullScreenTimer";
import { FullScreenModal } from "./Modals/FullScreenModal";
import { ShareDialog } from "./Modals/ShareDialog";

const EventTitle = ({ event }: { event: Event }) => {
  const { activeActivityId } = useEventActivityStore();

  const queryClient = useQueryClient(); // Access the query client instance

  const { user } = useUserStore();

  const { formattedTime, isLoading } = useTimer(
    activeActivityId?.toString() || event.id.toString()
  ); // Convert to string if necessary

  const { startMutation } = useEventActions({
    eventId: event.id,
    paused: event.isPaused,
  });

  const { data, error, isLoading: loading } = useGetActiveActivity(event.id);

  const isAdmin = !user?.id;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-y-4  md:mb-0 md:gap-y-0 justify-between w-full">
      <div className="flex flex-row items-center gap-x-2">
        {!isAdmin && (
          <Link href="/events">
            <Button
              variant="ghost"
              className="hidden border border-b-2 border-b-neutral-300 bg-white md:flex flex-row items-center gap-2"
            >
              <Home size={17} className="text-orange-500 font-extrabold" />
            </Button>
          </Link>
        )}

        <div className="flex flex-col ">
          <h1 className="text-lg md:text-2xl font-bold text-neutral-800">
            {event.title}
          </h1>
          <div className="flex flex-row items-center gap-x-1">
            <MapPin size={16} className="text-neutral-400" />
            <p className="text-sm text-neutral-400">{event.location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        {/* <h1 className="text-sm text-neutral-600 font-bold">
          {isLoading ? "Loading timer..." : formattedTime}
        </h1> */}
        {event.active && !event.isPaused && (
          <div className="flex items-center gap-2">
            <span className="relative flex size-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-4 bg-red-500"></span>
            </span>
          </div>
        )}

        {isAdmin ? (
          <Button
            variant="ghost"
            className={`border w-full md:max-w-44 border-b-2 p-3 border-b-neutral-300 bg-white flex flex-row items-center gap-2 ${
              event.active && "border-b-green-500"
            }  `}
          >
            <div
              className={`${
                event.active ? "bg-green-200" : " bg-orange-200"
              } p-1 rounded-md`}
            >
              {event.active ? (
                <RocketIcon size={16} className="text-green-600" />
              ) : (
                <Hourglass size={16} className="text-orange-600" />
              )}
            </div>

            {!isLoading && event.active ? formattedTime : "Waiting to start "}
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => startMutation.mutate()}
            disabled={startMutation.isPending}
            className={`border w-full md:max-w-40 border-b-2 p-3 border-b-neutral-300 bg-white flex flex-row items-center gap-2 ${
              event.active && "border-b-green-500"
            }  `}
          >
            <div className="bg-green-200 p-1 rounded-md">
              <RocketIcon size={16} className="text-green-600" />
            </div>

            {!isLoading && event.active ? formattedTime : "Start the event"}
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => queryClient.refetchQueries()}
          className="border max-w-40 border-b-2 border-b-neutral-300 bg-white flex flex-row items-center gap-2"
        >
          {queryClient.isFetching() ? (
            <Loader2Icon size={15} className="animate-spin" />
          ) : (
            <RefreshCcw size={15} />
          )}
        </Button>

        {!loading && !error && (
          <FullScreenModal event={event} activity={data} title={event.title} />
        )}

        <ShareDialog title={event.title} />

        {!loading && !error && (
          <FullScreenTimer event={event} activity={data} title={event.title} />
        )}
      </div>
    </div>
  );
};

export default EventTitle;
