"use client";

import { upsertCreateNewEvent } from "@/actions/activity";
import { Event } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateEvent = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const createEventMutation = useMutation({
    mutationFn: async (data: Event) => {
      const result = await upsertCreateNewEvent(data);

      return result;
    },
    onError: () => {
      toast("Failed to create the activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: (data: Event) => {
      toast("Event created successfully");
    },
  });

  return createEventMutation;
};

export default useCreateEvent;
