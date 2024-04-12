import { getUser } from "@/actions/clerk-auth";
import { useQuery } from "@tanstack/react-query";

const useGetServerUser = () => {
  const request = async () => {
    const user = await getUser();
    return user;
  };

  const response = useQuery({
    queryKey: ["user"],
    queryFn: () => request(),
    refetchIntervalInBackground: true,
    // refetchInterval: 1000,
  });

  return {
    ...response,
  };
};

export default useGetServerUser;
