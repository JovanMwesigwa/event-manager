import { upsertGetTheActiveActivity } from "@/actions/activity";
import { upsertEvent } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetActiveActivity = () => {
  const request = async () => {
    const event = await upsertGetTheActiveActivity(1);

    return event;
  };

  const response = useQuery({
    queryKey: ["event", 1],
    queryFn: request,
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetActiveActivity;
