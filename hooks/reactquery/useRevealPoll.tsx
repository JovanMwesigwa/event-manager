"use client";

import { upsertRevealPoll } from "@/actions/activity";
import { Poll } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useRevealPoll = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const revealPollMutation = useMutation({
    // @ts-ignore
    mutationFn: async (pollId: number) => {
      const result = await upsertRevealPoll(pollId);

      return result;
    },
    onError: () => {
      toast("Error revealing poll");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: (data: Poll) => {
      toast("Poll has been revealed");
    },
  });

  return revealPollMutation;
};

export default useRevealPoll;
