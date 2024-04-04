"use server";

import { updateCurrentEventTime } from "@/db/mutations";
import { getCurrentActivityTime } from "@/db/queries";

export const upsertActivityCurrentTime = async (activityId: number) => {
  const activityTime = await getCurrentActivityTime(activityId);

  return activityTime;
};

export const upsertUpdateActivityCurrentTime = async (activityId: number) => {
  const updatedTime = await updateCurrentEventTime(activityId);

  return updatedTime;
};
