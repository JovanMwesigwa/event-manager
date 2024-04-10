import { upsertGetPoll } from "@/actions/activity";
import { useQuery } from "@tanstack/react-query";

const useGetPoll = (pollId: number) => {
  const request = async (id: number) => {
    const event = await upsertGetPoll(id);
    return event;
  };

  const response = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => request(pollId),
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetPoll;
