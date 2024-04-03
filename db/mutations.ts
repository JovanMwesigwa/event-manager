import prisma from "@/prisma/client";
import { cache } from "react";

export const startTheEvent = cache(async (eventId: number) => {
  // First get the event
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  //   Check if the event is available
  if (!event) {
    throw new Error("Event not found");
  }

  //   Check if the event is already started
  if (!event.isPaused) {
    throw new Error("Event is already started");
  }

  // Start the event
  const startedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      active: true,
      isPaused: false,
    },
  });

  // Now get the first activity and start it
  const eventActivites = await prisma.event.findUnique({
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

  if (!eventActivites?.activities || eventActivites.activities.length < 0) {
    return startedEvent;
  }

  //  Check if the event has any paused activities
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

  // If the active activity exists, then pause it
  if (activeActivity && activeActivity.activities.length > 0) {
    await prisma.activity.update({
      where: {
        id: activeActivity.activities[0].id,
      },
      data: {
        active: true,
        isPaused: false,
      },
    });
    return startedEvent;
  }

  // Start the first activity
  await prisma.activity.update({
    where: {
      id: eventActivites.activities[0].id,
    },
    data: {
      active: true,
      isPaused: false,
    },
  });

  return startedEvent;
});

export const pauseTheEvent = cache(async (eventId: number) => {
  // First get the event
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  //   Check if the event is available
  if (!event) {
    throw new Error("Event not found");
  }

  //   Check if the event is already paused
  if (event.isPaused) {
    throw new Error("Event is already paused");
  }

  // Pause the event
  const pausedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      isPaused: true,
    },
  });

  // Now go through all the activities and the active one
  const activeActivity = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: {
        where: {
          active: true,
        },
      },
    },
  });

  if (activeActivity && activeActivity.activities.length > 0) {
    // Pause the active activity
    await prisma.activity.update({
      where: {
        id: activeActivity.activities[0].id,
      },
      data: {
        isPaused: true,
      },
    });
  }

  return pausedEvent;
});
export const stopTheEvent = cache(async (eventId: number) => {
  // First get the event
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  // Check if the event is available
  if (!event) {
    throw new Error("Event not found");
  }

  // Check if the event is already stopped
  if (!event.active) {
    throw new Error("Event is already stopped");
  }

  // Stop the event
  const stoppedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      active: false,
      isPaused: true,
    },
  });

  // Now go through all the activities and set the active ones to inactive
  await prisma.activity.updateMany({
    where: {
      eventId: eventId,
      active: true,
    },
    data: {
      active: false,
      isPaused: true,
    },
  });

  // Optional: Fetch the updated event with activities for verification/logging
  const updatedEventWithActivities = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: true, // Change this to fetch only necessary fields if needed
    },
  });

  return stoppedEvent;
});
