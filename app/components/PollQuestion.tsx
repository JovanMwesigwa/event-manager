import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetTitle } from "@/components/ui/sheet";
import { Dot } from "lucide-react";
import React from "react";

const PollQuestion = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-base text-neutral-700 font-bold my-3">
        What do you consider as a &quot;GOD Tier&quot; programming language?
      </h1>
      <RadioGroup defaultValue="python" className="py-2">
        <div className="flex items-center space-x-2">
          <div className="flex flex-row w-full h-[35px] relative items-center ">
            <Progress value={60} className="rounded-sm h-full " />

            <Label htmlFor="javascript" className="absolute left-3">
              <h1 className="font-medium">Python</h1>
            </Label>
          </div>

          <h1 className="font-medium">60%</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-row w-full h-[35px] relative items-center ">
            <Progress value={35} className="rounded-sm h-full " />

            <Label htmlFor="javascript" className="absolute left-3">
              <h1 className="font-medium">JavaScript</h1>
            </Label>
          </div>

          <h1 className="font-medium">35%</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-row w-full h-[35px] relative items-center ">
            <Progress value={45} className="rounded-sm h-full " />

            <Label htmlFor="javascript" className="absolute left-3">
              <h1 className="font-medium">Rust</h1>
            </Label>
          </div>

          <h1 className="font-medium">45%</h1>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <Button size="sm" className="my-3 bg-blue-500">
            Vote
          </Button>

          <div className="flex flex-row items-center text-sm gap-2">
            <p>45 Votes</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PollQuestion;
