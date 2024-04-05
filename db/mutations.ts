import prisma from "@/prisma/client";
import { addTimer, getTimerData, pauseTimer } from "@/services/firebaseService";
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
    const firstActivity = activeActivity.activities[0];

    await prisma.activity.update({
      where: {
        id: firstActivity.id,
      },
      data: {
        active: true,
        isPaused: false,
        started: new Date(),
      },
    });

    // This creates a timer in the firebase realtime database
    await addTimer(
      firstActivity.id.toString(),
      Number(firstActivity.duration),
      false
    );

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
      started: new Date(),
    },
  });

  // This creates a timer in the firebase realtime database
  await addTimer(
    eventActivites.activities[0].id.toString(),
    Number(eventActivites.activities[0].duration),
    false
  );

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
        stopped: new Date(),
      },
    });

    await pauseTimer(activeActivity.activities[0].id.toString(), true);
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
      stopped: new Date(),
    },
  });

  // Optional: Fetch the updated event with activities for verification/logging
  await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: true, // Change this to fetch only necessary fields if needed
    },
  });

  return stoppedEvent;
});

export const updateCurrentEventTime = async (activityId: number) => {
  const event = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });

  if (!event) {
    throw new Error("Activity not found");
  }

  // If the activity is paused, reset, not active, or done, do not update the current time
  if (event.isPaused || event.isReset || !event.active || event.done) {
    return event.currentTime;
  }

  const startTime = new Date();
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
  const newCurrentTime = `${hours}:${minutes}:${seconds}`;

  // Update the activity with the new current time
  const updatedEvent = await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      currentTime: newCurrentTime,
    },
  });

  return updatedEvent.currentTime;
};

export const jumpToActivity = async (activityId: number, eventId: number) => {
  const activity = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });

  if (!activity) {
    throw new Error("Activity not found");
  }

  // Check if the activity is already done
  if (activity.done) {
    throw new Error("Activity is already done");
  }

  // Check if the activity is paused
  if (!activity.isPaused) {
    throw new Error("Activity is not paused");
  }

  // Check if the activity is active
  if (activity.active) {
    throw new Error("Activity is already active");
  }

  // Get the event
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Get the current active activity from the activities[] in the event and pause it
  const activeActivity = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: {
        where: {
          active: true,
          isPaused: false,
        },
      },
    },
  });

  if (activeActivity && activeActivity.activities.length > 0) {
    await prisma.activity.update({
      where: {
        id: activeActivity.activities[0].id,
      },
      data: {
        active: false,
        isPaused: true,
        stopped: new Date(),
      },
    });

    // Pause the timer for the active activity
    await pauseTimer(activeActivity.activities[0].id.toString(), true);
  }

  // Start the activity
  await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      started: new Date(),
      isPaused: false,
      active: true,
    },
  });

  // add a timer for the activity
  await addTimer(activityId.toString(), Number(activity.duration), false);
};

export const activateNextActivity = async (eventId: number) => {
  // Get the event
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Get the active activity
  const activeActivity = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      activities: {
        where: {
          active: true,
          isPaused: false,
        },
      },
    },
  });

  if (!activeActivity || activeActivity.activities.length < 0) {
    // throw new Error("No active activity found");
    return { error: "No active activity found" };
  }

  const currentTimer = await getTimerData(
    activeActivity.activities[0].id.toString()
  );

  // Get the next activity
  const nextActivity = await prisma.activity.findFirst({
    where: {
      eventId: eventId,
      id: {
        gt: activeActivity.activities[0].id,
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!nextActivity) {
    // throw new Error("No next activity found");
    console.log("No next activity found");
    return { error: "No next activity found" };
  }

  // Pause the active activity
  await prisma.activity.update({
    where: {
      id: activeActivity.activities[0].id,
    },
    data: {
      active: false,
      isPaused: true,
      stopped: new Date(),
    },
  });

  // Pause the timer for the active activity
  await pauseTimer(activeActivity.activities[0].id.toString(), true);

  // Start the next activity
  await prisma.activity.update({
    where: {
      id: nextActivity.id,
    },
    data: {
      active: true,
      isPaused: false,
      started: new Date(),
    },
  });

  // Add a timer for the next activity
  await addTimer(
    nextActivity.id.toString(),
    Number(nextActivity.duration),
    false
  );
};
