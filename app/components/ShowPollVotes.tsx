import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useDeletePoll from "@/hooks/reactquery/useDeletePoll";
import useGetPoll from "@/hooks/reactquery/useGetPoll";
import useRevealPoll from "@/hooks/reactquery/useRevealPoll";
import { Loader, LockKeyholeOpen, Trash2 } from "lucide-react";

const ShowPollResults = ({
  pollId,
  isAdmin,
}: {
  pollId: number;
  isAdmin?: boolean;
}) => {
  const { data, isLoading } = useGetPoll(pollId);

  const { mutate, isPending, error } = useRevealPoll();
  const { mutate: deletePoll, isPending: isDeleting } = useDeletePoll();

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

      {isAdmin && (
        <div className="flex flex-row w-full gap-x-4">
          <Button
            onClick={() => mutate(pollId)}
            disabled={isPending}
            className="mt-4 h-9 flex flex-row items-center text-sm w-full "
          >
            {isPending ? (
              <Loader size={16} />
            ) : (
              <>
                Reveal
                <LockKeyholeOpen size={14} className="ml-2" />
              </>
            )}
          </Button>
          <Button
            onClick={() => deletePoll(pollId)}
            disabled={isDeleting}
            className="mt-4 h-9 flex flex-row items-center text-sm bg-red-500"
          >
            {isDeleting ? (
              <Loader size={16} />
            ) : (
              <>
                Delete
                <Trash2 size={14} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowPollResults;
