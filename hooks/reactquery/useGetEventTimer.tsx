import { getCurrentActivityTime } from "@/db/queries";
import { useQuery } from "@tanstack/react-query";

const useGetEventTimer = (activityId: number) => {
  const request = async () => {
    const event = await getCurrentActivityTime(activityId);
    return event;
  };

  const response = useQuery({
    queryKey: ["time", activityId],
    queryFn: request,
    refetchIntervalInBackground: true,
    refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetEventTimer;
