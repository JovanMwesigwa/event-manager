"use server";

import { getActivity } from "@/db/queries";

export const upsertActivity = async (activityId: number) => {
  const activity = await getActivity(activityId);

  return activity;
};
