import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { pauseEvent, startEvent, stopEvent } from "@/actions/event";
import { jumpToNextActivity, upsertGoToNextActivity } from "@/actions/activity";

interface UseEventActionsProps {
  eventId: number;
  paused: boolean;
}

export function useEventActions({ eventId, paused }: UseEventActionsProps) {
  const queryClient = useQueryClient(); // Access the query client instance

  const startMutation = useMutation({
    mutationFn: async () => {
      if (!paused) {
        toast("Event is already started");
        return;
      }

      await startEvent(eventId);
    },
    onError: () => {
      toast("Failed to start the event");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: () => {
      // Do something when the mutation is successful
      toast("Event has been started");
    },
  });

  const pauseMutation = useMutation({
    mutationFn: async () => {
      if (paused) {
        toast("Event is already paused");
        return;
      }

      await pauseEvent(eventId);
      toast("Event has been paused");
    },
    onError: () => {
      toast("Failed to pause the event");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
  });

  const goToNext = useMutation({
    mutationFn: async () => {
      await upsertGoToNextActivity(eventId);
    },
    onError: () => {
      toast("Failed to jump to the next activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast("Starting next activity");
    },
  });

  const jumpToNextActivityMutation = useMutation({
    mutationFn: async () => {
      await jumpToNextActivity(eventId);
    },
    onError: () => {
      toast("Failed to jump to the next activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast("Starting next activity");
    },
  });

  const stopMutation = useMutation({
    mutationFn: async () => {
      await stopEvent(eventId);
      toast("Event has been stopped");
    },
    onError: () => {
      toast("Failed to stop the event");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
  });

  return {
    startMutation,
    pauseMutation,
    stopMutation,
    jumpToNextActivityMutation,
    goToNext,
  };
}
