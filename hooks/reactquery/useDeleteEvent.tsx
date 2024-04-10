"use client";

import { upsertDeleteEvent } from "@/actions/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteEvent = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: number) => {
      const result = await upsertDeleteEvent(eventId);
      return result;
    },
    onError: (error: Error) => {
      toast(`Failed to delete the event: ${error.message}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(); // Invalidate 'events' queries to refresh the list
    },
    onSuccess: () => {
      toast("Event deleted successfully");
    },
  });

  return deleteEventMutation;
};

export default useDeleteEvent;
