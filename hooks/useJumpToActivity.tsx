import {
  activateActivity,
  upsertUpdateActivityCurrentTime,
} from "@/actions/activity";
import { jumpToActivity } from "@/db/mutations";
import { QueryClient, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useJumpToActivity = ({
  activityId,
  eventId,
}: {
  activityId: number;
  eventId: number;
}) => {
  const jumpToActivityMutation = useMutation({
    mutationFn: async () => {
      await activateActivity(activityId, eventId);
    },
    onError: () => {
      //   toast("Failed to start the event");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries();
    },
  });

  return {
    jumpToActivityMutation,
  };
};

export default useJumpToActivity;
