// In your EventsPage component
"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";

import EventDatesCard from "./dates-card";
import DescriptionCard from "./description-card";
import CreateHeader from "./header";
import EventLocationCard from "./location-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useCreateEvent from "@/hooks/reactquery/useCreateEvent";
import { Event } from "@prisma/client";
import { Loader } from "lucide-react";
import Image from "next/image";

const EventsPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("Event Description");
  const [location, setLocation] = useState<string>("Event Location");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>("09:00 AM");
  const [endTime, setEndTime] = useState<string>("05:00 PM");

  const mutation = useCreateEvent();

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // @ts-ignore
    const data = {
      title,
      starts: startDate.toISOString(), // Example date: April 22, 2024
      host: "Host goes here..", // Will be got from the UserObject...
      description,
      location,
      duration: "Event Duration goes here..",
      image: "/images/event.jpg",
      currentTime: new Date().toLocaleTimeString(),
    } as Event;

    // console.log(data);

    mutation.mutate(data, {
      onSuccess: (data) => {
        // Check if the event ID is defined before navigating
        if (data?.id) {
          router.push(`/event/${data.id}`);
        } else {
          console.error("Event ID is undefined.");
        }
      },
    });
  };

  if (mutation.isPending)
    return (
      <div className="h-full w-full items-center justify-center flex flex-1">
        <Loader />
      </div>
    );

  return (
    <form className="grid grid-cols-12 h-screen text-neutral-500">
      <div className="col-span-5 flex items-center flex-col pr-4">
        <div className="flex bg-neutral-200 cursor-pointer rounded-lg h-1/2 w-full relative overflow-hidden">
          <Image
            src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/event-covers/ba/32c7dea4-d373-4d62-abf7-70e2482187d1"
            alt={"Event Name"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="col-span-7 flex flex-col">
        <CreateHeader />

        <Input
          className=" text-5xl font-extrabold h-24 bg-slate-100 border-none text-neutral-700"
          placeholder="Event Name"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <EventDatesCard
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          endDate={endDate}
          startDate={startDate}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />

        <EventLocationCard location={location} setLoction={setLocation} />

        <DescriptionCard
          description={description}
          setDescription={setDescription}
        />

        <div className="flex w-full justify-between  ml-3 mb-5">
          <Button
            onClick={handleSubmit}
            className="h-12 w-full text-white rounded-md bg-primary flex items-center justify-center"
          >
            Create Event
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EventsPage;
