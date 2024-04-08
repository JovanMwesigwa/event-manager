"use server";

import {
  activateNextActivity,
  jumpToActivity,
  updateCurrentEventTime,
} from "@/db/mutations";
import { getCurrentActivityTime, getTheActiveActivity } from "@/db/queries";
import { setActiveEventAndActivity } from "@/services/firebaseService";

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
