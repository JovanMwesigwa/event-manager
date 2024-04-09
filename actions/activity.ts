"use server";

import {
  activateNextActivity,
  createActivity,
  createAnEvent,
  deleteActivity,
  jumpToActivity,
  updateCurrentEventTime,
} from "@/db/mutations";
import { getCurrentActivityTime, getTheActiveActivity } from "@/db/queries";
import { setActiveEventAndActivity } from "@/services/firebaseService";
import { ActivitySchema, EventSchema } from "@/validation";
import { Event } from "@prisma/client";

export const upsertActivityCurrentTime = async (activityId: number) => {
  const activityTime = await getCurrentActivityTime(activityId);

  return activityTime;
};

export const upsertUpdateActivityCurrentTime = async (activityId: number) => {
  const updatedTime = await updateCurrentEventTime(activityId);

  return updatedTime;
};

export const activateActivity = async (activityId: number, eventId: number) => {
  await jumpToActivity(activityId, eventId);
};

export const jumpToNextActivity = async (eventId: number) => {
  const activity = await activateNextActivity(eventId);

  return activity;
};

export const upsertGetTheActiveActivity = async (eventId: number) => {
  const activity = await getTheActiveActivity(eventId);
  return activity?.activities[0] ?? {}; // Return an empty object (or suitable default) if undefined
};

export const addActiveEventAndActivity = async (
  eventId: string,
  activityId: string
) => {
  // Add the active event and activity to the Realtime Database
  const result = await setActiveEventAndActivity(eventId, activityId);

  return result;
};

export const upsertNewActivity = async (data: Event) => {
  try {
    const validationSchema = ActivitySchema.safeParse(data);

    if (!validationSchema.success) {
      throw new Error(validationSchema.error.message);
    }

    const result = await createActivity(data);

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const upsertRemoveActivity = async (activityId: number) => {
  await deleteActivity(activityId);

  return;
};

export const upsertCreateNewEvent = async (data: Event) => {
  try {
    const validationSchema = EventSchema.safeParse(data);

    if (!validationSchema.success) {
      throw new Error(validationSchema.error.message);
    }

    const result = await createAnEvent(data);

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
