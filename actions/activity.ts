"use server";

import { jumpToActivity, updateCurrentEventTime } from "@/db/mutations";
import { getCurrentActivityTime } from "@/db/queries";
import { addTimer } from "@/services/firebaseService";

export const upsertActivityCurrentTime = async (activityId: number) => {
  const activityTime = await getCurrentActivityTime(activityId);

  return activityTime;
};

export const upsertUpdateActivityCurrentTime = async (activityId: number) => {
  const updatedTime = await updateCurrentEventTime(activityId);

  return updatedTime;
};

export const activateActivity = async (
  activityId: number,
  activeActivityId: number | null
) => {
  await jumpToActivity(activityId, activeActivityId);
};
