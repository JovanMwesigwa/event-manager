import { upsertAllEvents } from "@/actions/event";
import { useQuery } from "@tanstack/react-query";

const useGetAllEvents = (userId: string) => {
  const request = async (id: string) => {
    const events = await upsertAllEvents(id);

    return events;
  };

  const response = useQuery({
    queryKey: ["allEvents", userId],
    queryFn: () => request(userId),
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetAllEvents;
