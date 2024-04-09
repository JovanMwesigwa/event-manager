import { upsertRemoveActivity } from "@/actions/activity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteActivity = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const deleteActivityMutation = useMutation({
    mutationFn: async (activityId: number) => {
      const result = await upsertRemoveActivity(activityId);

      toast("Activity removed successfully");

      return result;
    },
    onError: () => {
      toast("Failed to remove the activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
  });

  return deleteActivityMutation;
};

export default useDeleteActivity;
