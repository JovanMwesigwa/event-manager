// In your EventsPage component

import { Input } from "@/components/ui/input";
import Link from "next/link";
import EventDatesCard from "./dates-card";
import DescriptionCard from "./description-card";
import CreateHeader from "./header";
import EventLocationCard from "./location-card";

const EventsPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen text-neutral-500">
      <div className="col-span-5 flex items-center flex-col pr-4">
        <div className="flex bg-neutral-200 cursor-pointer rounded-lg h-1/2 w-full"></div>
      </div>
      <div className="col-span-7 flex flex-col">
        <CreateHeader />

        <Input
          className=" text-5xl font-extrabold h-24 bg-slate-100 border-none text-neutral-700"
          placeholder="Event Name"
        />

        <EventDatesCard />

        <EventLocationCard />

        <DescriptionCard />

        <Link href="/event/1">
          <div className="flex w-full justify-between  ml-3 mb-5">
            <div className="h-12 w-full text-white rounded-md bg-primary flex items-center justify-center">
              Create Event
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventsPage;
