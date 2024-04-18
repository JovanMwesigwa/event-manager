import DeleteEventPop from "@/app/components/Pops/DeleteEventPop";
import { Button } from "@/components/ui/button";
import { thumnailUrl } from "@/data";
import { Event } from "@prisma/client";
import {
  CalendarCheck,
  EllipsisVertical,
  Eye,
  MapPin,
  PenLine,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllEventCard = ({ event }: { event: Event }) => {
  return (
    <div className="col-span-6 h-28 md:h-32 p-2 border overflow-hidden bg-white rounded-sm md:gap-4 flex flex-row mb-4">
      <div className="h-full md:w-36 bg-neutral-300 rounded-sm relative">
        <Image
          src={thumnailUrl}
          alt={"Event Name"}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between ">
        <div className="col-span-6 flex flex-row items-center justify-between">
          <h1 className="font-bold text-neutral-500">{event.title}</h1>

          <div className="flex flex-row items-center gap-x-2 justify-center">
            <Link href={`/events/${event.id}`}>
              <Button
                variant="ghost"
                className="border border-green-400 hover:bg-green-200 text-[11px] md:text-xs text-green-800  p-1 rounded-sm bg-green-100 md:h-8 h-6 w-11 md:w-16"
              >
                OPEN
              </Button>
            </Link>

            <DeleteEventPop eventId={event.id} />
          </div>
        </div>

        <p className="text-[11px] md:text-xs text-neutral-400 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          corporis suscipit dignissimos? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Cupiditate asperiores molestias quaerat impedit
          maxime nulla reiciendis ducimus. Iste, molestiae veniam.
        </p>

        <div className="w-full flex flex-row items-center justify-between text-[11px] md:text-sm text-neutral-500 font-light">
          <div className="flex flex-1 items-center gap-x-1">
            <UserRound className="text-neutral-500 size-3" />
            {/* @ts-ignore */}
            <p className="line-clamp-1">{event.activityCount} Activities</p>
          </div>
          <div className="flex flex-row items-center gap-x-1 flex-1 ">
            <MapPin className="text-neutral-500 size-5" />
            <p className="line-clamp-1">{event.location}</p>
          </div>
          <div className="flex flex-row items-center gap-x-1 flex-1">
            <Eye className="text-neutral-500 size-3" />
            <p className="line-clamp-1">Public</p>
          </div>
          <div className="flex flex-1  gap-x-1 items-center">
            <CalendarCheck className="text-neutral-500 size-3" />
            <p className="line-clamp-1 ">
              {/* {event.createdAt.toLocaleDateString()} */}
              {event.starts.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventCard;
