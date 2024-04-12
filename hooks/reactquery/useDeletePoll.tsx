import { upsertDeletePoll } from "@/actions/activity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeletePoll = () => {
  const queryClient = useQueryClient(); // Access the query client instance

  const deletePollMutation = useMutation({
    mutationFn: async (pollId: number) => {
      const result = await upsertDeletePoll(pollId);

      return result;
    },
    onError: () => {
      toast("Failed to delete the poll");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onSuccess: () => {
      toast("Poll deleted successfully");
    },
  });

  return deletePollMutation;
};

export default useDeletePoll;
