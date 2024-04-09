import { upsertNewActivity } from "@/actions/activity";
import { Activity } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateActivity = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const createActivityMutation = useMutation({
    mutationFn: async (data: Activity) => {
      const result = await upsertNewActivity(data);

      return result;
    },
    onError: () => {
      toast("Failed to create the activity");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
  });

  return createActivityMutation;
};

export default useCreateActivity;
