import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";
import useGetPoll from "@/hooks/reactquery/useGetPoll";
import useVotePoll from "@/hooks/reactquery/useVotePoll";
import {
  Check,
  CheckCircle,
  Loader,
  Loader2,
  SendHorizonal,
} from "lucide-react";
import { useState } from "react";

const VotePoll = ({ pollId }: { pollId: number }) => {
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const { data, error, isLoading } = useGetPoll(pollId);

  const { mutate, isPending, isSuccess } = useVotePoll();

  const submitVote = () => {
    if (votedOption !== null) {
      // @ts-ignore
      mutate({ pollId, optionId: votedOption });
    }
  };

  if (isLoading) return <Loader className="w-10 h-10 text-primary-500" />;

  return (
    <div className="flex flex-col">
      <h1 className="text-base text-neutral-700 font-bold my-3">
        Qn: {data?.question}
      </h1>

      <RadioGroup defaultValue="python" className="py-2">
        {data?.options.map((choice) => (
          <div
            key={choice.id}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setVotedOption(choice.id)}
          >
            <div
              className={`flex flex-row w-full h-[30px] relative items-center hover:bg-green-100 border rounded-md border-green-500 ${
                votedOption === choice.id ? "text-white" : "text-green-500"
              }  justify-center`}
            >
              {votedOption === choice.id && (
                <Progress value={100} className="rounded-sm h-full " />
              )}

              {/* <Progress value={100} className="rounded-sm h-full " /> */}
              <Label htmlFor="javascript" className="absolute left-3 ">
                <div className="flex flex-row items-center gap-x-1">
                  <h1 className="font-medium text-sm text-center">
                    {choice.text}
                  </h1>
                  {votedOption === choice.id && (
                    <CheckCircle size={12} className="text-white" />
                  )}
                </div>
              </Label>
            </div>

            {/* <h1 className="font-medium text-sm">{choice.votes}</h1> */}
          </div>
        ))}

        <div className="w-full flex flex-row items-center justify-between my-4">
          <div className="flex flex-row items-center text-xs gap-2">
            <p>Cast your vote</p>
          </div>

          <Button
            onClick={submitVote}
            disabled={isPending !== false || votedOption === null}
            className="h-8 rounded-sm flex flex-row items-center gap-x-2 bg-blue-500"
          >
            {isPending ? <Loader2 /> : <>Submit</>}
            <SendHorizonal size={12} />
          </Button>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VotePoll;
