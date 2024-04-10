"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Activity } from "@prisma/client";
import { ListCollapse, Plus, Minus, SendHorizonal } from "lucide-react";
import { useState } from "react";
import PollQuestion from "./PollQuestion";

const AddPollSheet = ({ event }: { event: Activity }) => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [choices, setChoices] = useState([
    { id: 1, name: "Choice 1" },
    { id: 2, name: "Choice 2" },
    { id: 3, name: "Choice 3" },
  ]);

  const handleChoiceChange = (id: number, name: string) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id ? { ...choice, name: name } : choice
      )
    );
  };

  const addChoice = () => {
    const newId =
      choices.length > 0 ? Math.max(...choices.map((c) => c.id)) + 1 : 1;
    setChoices([...choices, { id: newId, name: "" }]);
  };

  const removeChoice = (id: number) => {
    setChoices(choices.filter((choice) => choice.id !== id));
  };

  return (
    <div className="flex w-full justify-end py-2 cursor-pointer">
      <Sheet>
        <SheetTrigger>
          <div className="flex flex-row items-center text-neutral-400 gap-x-2">
            <p className="text-xs">Add Poll</p>
            <ListCollapse className="size-3 md:size-4" />
          </div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full md:w-[988px] md:m-3 md:rounded-md max-h-screen overflow-y-auto"
        >
          <div className="flex flex-col ">
            <h1 className="font-bold">Create a poll for this activity</h1>
            <Input
              placeholder="Ask a question"
              className="border-none h-20 text-xl p-0 font-medium"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            <div className="border rounded-md p-4 gap-4 flex flex-col">
              {choices.map((choice, index) => (
                <div key={choice.id} className="flex flex-row items-center">
                  <Input
                    placeholder={`Choice ${index + 1}`}
                    className="font-medium text-base flex-grow"
                    value={choice.name}
                    onChange={(e) =>
                      handleChoiceChange(choice.id, e.target.value)
                    }
                  />
                  <Button
                    onClick={() => removeChoice(choice.id)}
                    className="ml-2 text-blue-500"
                    variant="ghost"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                onClick={addChoice}
                className="self-start mt-2 gap-2 text-blue-500"
                variant="ghost"
              >
                <Plus size={16} />
                Add Choice
              </Button>
            </div>
            <Button className="my-4 flex flex-row items-center gap-x-2">
              Send
              <SendHorizonal size={16} />
            </Button>
          </div>
          <h1 className="font-bold mt-4 text-blue-400">Preview</h1>
          <PollQuestion question={pollQuestion} choices={choices} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddPollSheet;
