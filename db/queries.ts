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
