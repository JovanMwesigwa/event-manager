"use server";

import { pauseTheEvent, startTheEvent, stopTheEvent } from "@/db/mutations";
import { getEventActivities } from "@/db/queries";

export const upsertEvent = async (eventId: number) => {
  const eventWithActivities = await getEventActivities(eventId);

  return eventWithActivities;
};

export const startEvent = async (eventId: number) => {
  const event = await startTheEvent(eventId);
  return event;
};

export const pauseEvent = async (eventId: number) => {
  const event = await pauseTheEvent(eventId);
  return event;
};

export const stopEvent = async (eventId: number) => {
  const event = await stopTheEvent(eventId);
  return event;
};
