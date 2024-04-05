import {
  activateActivity,
  upsertUpdateActivityCurrentTime,
} from "@/actions/activity";
import { jumpToActivity } from "@/db/mutations";
import { QueryClient, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useJumpToActivity = ({
  activityId,
  activeActivityId,
}: {
  activityId: number;
  activeActivityId: number | null;
}) => {
  const jumpToActivityMutation = useMutation({
    mutationFn: async () => {
      await activateActivity(activityId, activeActivityId);
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
