// useEventActions.ts

import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { pauseEvent, startEvent, stopEvent } from "@/actions/event";
import { jumpToNextActivity } from "@/actions/activity";

const queryClient = new QueryClient();

interface UseEventActionsProps {
  eventId: number;
  paused: boolean;
}

export function useEventActions({ eventId, paused }: UseEventActionsProps) {
  const startMutation = useMutation({
    mutationFn: async () => {
      if (!paused) {
        toast("Event is already started");
        return;
      }

      await startEvent(eventId);

      toast("Event has been started");
    },
    onError: () => {
      toast("Failed to start the event");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries();
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
      return await queryClient.invalidateQueries();
    },
  });

  const jumpToNextActivityMutation = useMutation({
    mutationFn: async () => {
      // Jump to the next activity
      await jumpToNextActivity(eventId);
    },
    onError: () => {
      toast("Failed to jump to the next activity");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries();
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
      return await queryClient.invalidateQueries();
    },
  });

  return {
    startMutation,
    pauseMutation,
    stopMutation,
    jumpToNextActivityMutation,
  };
}
