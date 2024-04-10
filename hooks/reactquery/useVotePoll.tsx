"use client";

import { upsertVotePoll } from "@/actions/activity";
import { RawPollType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useVotePoll = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const votePollMutation = useMutation({
    // @ts-ignore
    mutationFn: async ({ pollId, optionId }) => {
      const result = await upsertVotePoll(pollId, optionId);

      return result;
    },
    onError: () => {
      toast("Failed to submit vote");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: (data: RawPollType) => {
      toast("Vote successfully submitted");
    },
  });

  return votePollMutation;
};

export default useVotePoll;
