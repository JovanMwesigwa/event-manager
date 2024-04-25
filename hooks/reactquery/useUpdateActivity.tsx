import { upsertUpdateActivity } from "@/actions/activity";
import { Activity } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateActivity = (activityId: number) => {
  const queryClient = useQueryClient(); // Access the query client instance

  const updateActivityMutation = useMutation({
    mutationFn: async (data: Activity) => {
      const result = await upsertUpdateActivity(activityId, data);

      return result;
    },
    onError: () => {
      toast("Failed to update the activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: (data: Activity) => {
      toast("Activity updated successfully");
    },
  });

  return updateActivityMutation;
};

export default useUpdateActivity;
