import { Progress } from "@/components/ui/progress";
import useGetPoll from "@/hooks/reactquery/useGetPoll";
import { Loader } from "lucide-react";

const ShowPollResults = ({ pollId }: { pollId: number }) => {
  const { data, isLoading } = useGetPoll(pollId);

  if (isLoading) return <Loader className="w-10 h-10 text-primary-500" />;

  const totalVotes =
    data?.options.reduce((acc, option) => acc + option.votes, 0) || 1; // Avoid division by zero

  return (
    <div className="flex flex-col">
      <h1 className="text-base text-neutral-700 font-bold my-3">
        Qn: {data?.question}
      </h1>

      {data?.options.map((option) => {
        const votePercentage = (option.votes / totalVotes) * 100;
        return (
          <div key={option.id} className="my-2">
            <div className="relative">
              <Progress value={votePercentage} className="rounded-sm h-8" />
              <div className="absolute inset-0 flex justify-between items-center px-3 text-xs ">
                <span className="font-medium ">{option.text}</span>
                <span className="">{votePercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowPollResults;
