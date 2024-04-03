import { upsertEvent } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = () => {
  const request = async () => {
    const event = await upsertEvent(1);
    return event;
  };

  const response = useQuery({
    queryKey: ["event", 1],
    queryFn: request,
    refetchIntervalInBackground: true,
    refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetEvent;
