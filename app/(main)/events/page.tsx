"use client";

import MainButton from "@/app/components/buttons/MainButton";
import { Separator } from "@/components/ui/separator";
import useGetAllEvents from "@/hooks/reactquery/useGetAllEvents";
import useUserStore from "@/stores/user-store";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import AllEventCard from "./AllEventCard";
import Sidebar from "./Sidebar";

const AllEventsPage = () => {
  const { user } = useUserStore();

  const { data, isLoading, error } = useGetAllEvents(user?.id);

  return (
    <div className="grid grid-cols-6 gap-x-6">
      <div className="h-full col-span-6 md:col-span-4 grid grid-cols-6 ">
        {/* Left... */}
        <div className="col-span-3  ">
          <h1 className="font-bold text-xl">My Events</h1>

          {/* <Input className="h-8 my-4" placeholder="Search your event" /> */}
        </div>

        {/* Right.. */}
        <div className="col-span-3 flex justify-end ">
          <Link href="/create">
            <MainButton
              title="Create an event"
              active={false}
              handleClick={() => console.log("test")}
              loading={false}
              Icon={Plus}
            />
          </Link>
        </div>

        <Separator className="col-span-6 my-4" />

        <div className="w-full text-[11px] md:text-sm px-4 gap-x-2 h-10 mb-4 bg-neutral-200 border border-neutral-300 rounded-sm col-span-6 flex flex-row items-center">
          <Star size={16} className="text-yellow-500" />
          <h1>Create unlimited events beyond just 3 by upgrading. </h1>
          <Link href="/billing">
            <p className="text-blue-500 underline hidden md:block">
              See billing
            </p>
          </Link>
        </div>

        {data?.length === 0 && (
          <div className="col-span-6 flex flex-col opacity-50 items-center justify-center h-full">
            <h1 className=" md:text-xl font-bold">No events found</h1>
            <p className="text-sm text-neutral-500">
              Create an event to get started
            </p>
          </div>
        )}

        {/* Botton */}
        {data?.map((event) => (
          <AllEventCard key={event.id} event={event} />
        ))}
      </div>

      <Sidebar />
    </div>
  );
};

export default AllEventsPage;
