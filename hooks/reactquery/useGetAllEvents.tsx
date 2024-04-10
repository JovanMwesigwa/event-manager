import { upsertAllEvents } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetAllEvents = () => {
  const request = async () => {
    const events = await upsertAllEvents();

    return events;
  };

  const response = useQuery({
    queryKey: ["allEvents"],
    queryFn: request,
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetAllEvents;
