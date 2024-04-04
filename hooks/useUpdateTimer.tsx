import { upsertUpdateActivityCurrentTime } from "@/actions/activity";
import { QueryClient, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

const useUpdateTimer = ({ activityId }: { activityId: number }) => {
  const startUpdateMutation = useMutation({
    mutationFn: async () => {
      await upsertUpdateActivityCurrentTime(activityId);
    },
    onError: () => {
      //   toast("Failed to start the event");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries();
    },
  });

  return {
    startUpdateMutation,
  };
};

export default useUpdateTimer;
