import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup } from "@/components/ui/radio-group";

const PollQuestion = ({
  question,
  choices,
}: {
  question: string;
  choices: { id: number; name: string }[];
}) => {
  if (!question) return;

  return (
    <div className="flex flex-col">
      <h1 className="text-base text-neutral-700 font-bold my-3">{question}</h1>

      <RadioGroup defaultValue="python" className="py-2">
        {choices.map((choice) => (
          <div key={choice.id} className="flex items-center space-x-2">
            <div className="flex flex-row w-full h-[30px] relative items-center ">
              <Progress value={60} className="rounded-sm h-full " />

              <Label htmlFor="javascript" className="absolute left-3">
                <h1 className="font-medium text-sm">{choice.name}</h1>
              </Label>
            </div>

            <h1 className="font-medium text-sm">60%</h1>
          </div>
        ))}

        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center text-xs gap-2">
            <p>45 Votes</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PollQuestion;
