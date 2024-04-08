import { upsertGetTheActiveActivity } from "@/actions/activity";
import { upsertEvent } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetActiveActivity = (eventId: number) => {
  const request = async () => {
    const event = await upsertGetTheActiveActivity(eventId);

    return event;
  };

  const response = useQuery({
    queryKey: ["active", eventId],
    queryFn: request,
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetActiveActivity;
