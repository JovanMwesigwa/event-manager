import { upsertEvent } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (eventId: number) => {
  const request = async (id: number) => {
    const event = await upsertEvent(id);
    return event;
  };

  const response = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => request(eventId),
    refetchIntervalInBackground: true,
    refetchInterval: 10000,
  });

  return {
    ...response,
  };
};

export default useGetEvent;
