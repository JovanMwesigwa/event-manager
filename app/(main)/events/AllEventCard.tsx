import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import { EllipsisVertical, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllEventCard = ({ event }: { event: Event }) => {
  return (
    <div className="col-span-6 h-32 p-2 border overflow-hidden bg-white rounded-sm gap-4 flex flex-row mb-4">
      <div className="h-full w-36 bg-neutral-300 rounded-sm relative">
        <Image
          src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/event-covers/ba/32c7dea4-d373-4d62-abf7-70e2482187d1"
          alt={"Event Name"}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="col-span-6 flex flex-row items-center justify-between">
          <h1 className="font-bold text-neutral-500">{event.title}</h1>

          <div className="flex flex-row items-center gap-x-2">
            <Link href={`/events/${event.id}`}>
              <Button
                variant="ghost"
                className="border border-green-400 hover:bg-green-200 text-xs text-green-800  p-1 rounded-sm bg-green-100 h-8 w-16"
              >
                OPEN
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="border text-xs border-neutral-300 p-1 rounded-sm h-8 w-8"
            >
              <EllipsisVertical size={16} className="text-neutral-500" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-neutral-400 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          corporis suscipit dignissimos? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Cupiditate asperiores molestias quaerat impedit
          maxime nulla reiciendis ducimus. Iste, molestiae veniam.
        </p>

        <div className="w-full flex flex-row items-center justify-between text-sm text-neutral-500 font-light">
          {/* @ts-ignore */}
          <p>{event.activityCount} Activities</p>
          <div className="flex flex-row items-center gap-x-1">
            <MapPin size={16} className="text-neutral-500" />
            <p>{event.location}</p>
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <Eye size={16} className="text-neutral-500" />
            <p>Public</p>
          </div>
          <p>Created {event.createdAt.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AllEventCard;
