import prisma from "@/prisma/client";
import { cache } from "react";

export const getEventActivities = cache(async (eventId: number) => {
  const eventWithActivities = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: {
        orderBy: {
          id: "asc",
        },
      }, // Fetch all activities related to the event and order them by id
    },
  });

  return eventWithActivities;
});

export const getCurrentActivityTime = cache(async (activityId: number) => {
  const event = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });

  if (!event) {
    throw new Error("Activity not found");
  }

  // If the event is not active or done, return the current time stored in the database
  if (!event.active || event.done) {
    return event.currentTime;
  }

  // If the event is paused, return the stored current time
  if (event.isPaused) {
    return event.currentTime;
  }

  // If the event is reset, return the start time
  if (event.isReset) {
    return event.started;
  }

  // Calculate the current time of the event if it is active and not paused
  const startTime = new Date(event.started as Date);
  const currentTime = new Date();
  const elapsed = currentTime.getTime() - startTime.getTime();

  // Convert elapsed time in milliseconds to a time string format (HH:MM:SS)
  const hours = Math.floor(elapsed / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((elapsed / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
});

export const getTheActiveActivity = cache(async (eventId: number) => {
  const activeActivity = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: {
        where: {
          active: true,
          // isPaused: false,
        },
      },
    },
  });

  return activeActivity; // Return an empty object (or suitable default) if no event is found
});

export const getAllEvents = cache(async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      _count: {
        select: { activities: true },
      },
    },
  });

  return events.map((event) => ({
    ...event,
    activityCount: event._count.activities,
  }));
});
