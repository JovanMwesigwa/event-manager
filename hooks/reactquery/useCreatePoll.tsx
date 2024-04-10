"use client";

import { upsertCreatePoll } from "@/actions/activity";
import { RawPollType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreatePoll = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const createPollMutation = useMutation({
    // @ts-ignore
    mutationFn: async (data: RawPollType) => {
      const result = await upsertCreatePoll(data);

      return result;
    },
    onError: () => {
      toast("Failed to create the activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: (data: RawPollType) => {
      toast("Event created successfully");
    },
  });

  return createPollMutation;
};

export default useCreatePoll;
