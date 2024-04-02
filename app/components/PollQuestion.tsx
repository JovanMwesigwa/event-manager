import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetTitle } from "@/components/ui/sheet";
import { Dot } from "lucide-react";
import React from "react";

const PollQuestion = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-base text-neutral-700 font-bold">
        What do you consider as a &quot;GOD Tier&quot; programming language?
      </h1>
      <RadioGroup defaultValue="python" className="py-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem color="#3b82f6" value="python" id="option-one" />
          <Label htmlFor="python">
            <SheetTitle className="">Python</SheetTitle>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="javascript" id="option-two" />

          <Label htmlFor="javascript">
            <SheetTitle>Javascript</SheetTitle>
          </Label>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center text-sm gap-2">
            <div className="size-6 bg-neutral-300 rounded-full"></div>
            <p>Total Votes: 45</p>
            <Dot size={18} />
            <p>5 minutes left</p>
          </div>
          <Button size="sm" className="my-3">
            Vote
          </Button>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PollQuestion;
