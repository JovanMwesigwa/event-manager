import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Activity } from "@prisma/client";
import { Plus, Minus, SendHorizontal, Loader } from "lucide-react";
import { useState } from "react";
import PollQuestion from "./PollQuestion";
import { toast } from "sonner";
import useCreatePoll from "@/hooks/reactquery/useCreatePoll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowPollResults from "./ShowPollVotes";
import useUserStore from "@/stores/user-store";

const AddPollSheet = ({ event }: { event: Activity }) => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [choices, setChoices] = useState([
    { id: 1, name: "Choice 1" },
    { id: 2, name: "Choice 2" },
    { id: 3, name: "Choice 3" },
  ]);

  const { mutate: createPoll, isPending } = useCreatePoll();

  const { user } = useUserStore();

  const handleChoiceChange = (id: number, name: string) => {
    setChoices(
      choices.map((choice) => (choice.id === id ? { ...choice, name } : choice))
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

  const handleSubmitPoll = () => {
    const pollData = {
      question: pollQuestion,
      options: choices.map((choice) => choice.name),
      activityId: event.id,
    };
    createPoll(pollData, {
      onSuccess: () => {
        toast("Poll created successfully");
        setPollQuestion("");
        setChoices([
          { id: 1, name: "Choice 1" },
          { id: 2, name: "Choice 2" },
          { id: 3, name: "Choice 3" },
        ]);
      },
      onError: (error) => {
        toast(`Error creating poll: ${error.message}`);
      },
    });
  };

  // @ts-ignore
  const hasPoll = event.poll ? true : false;

  return (
    <div className="flex w-full justify-end py-2 cursor-pointer">
      <Sheet>
        <SheetTrigger>
          <div className="flex flex-row items-center text-neutral-400 gap-x-2">
            <p className="text-xs">Add Poll</p>
          </div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full md:w-[988px] md:m-3 md:rounded-md max-h-screen overflow-y-auto"
        >
          <Tabs
            defaultValue="new"
            className="w-full py-5 overflow-y-auto h-full "
          >
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="new">
                New Poll
              </TabsTrigger>
              <TabsTrigger className="w-full" value="polls">
                Active Polls
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="new"
              className="py-4 flex flex-col overflow-y-auto h-full "
            >
              {hasPoll ? (
                <>
                  {/* @ts-ignore */}
                  <ShowPollResults pollId={event.poll.id} isAdmin />
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <h1 className="font-bold">
                      Create a poll for this activity
                    </h1>
                    <Input
                      placeholder="Ask a question"
                      className="border-none h-16 text-xl p-0 font-medium"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                    />
                    <div className="border rounded-md p-4 gap-4 flex flex-col">
                      {choices.map((choice, index) => (
                        <div
                          key={choice.id}
                          className="flex flex-row items-center"
                        >
                          <Input
                            placeholder={`Choice ${index + 1}`}
                            className="font-medium text-sm flex-grow"
                            value={choice.name}
                            onChange={(e) =>
                              handleChoiceChange(choice.id, e.target.value)
                            }
                          />
                          <Button
                            onClick={() => removeChoice(choice.id)}
                            className="ml-2 text-blue-500 text-sm"
                            variant="ghost"
                          >
                            <Minus size={15} />
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
                    <Button
                      onClick={handleSubmitPoll}
                      className="my-4 flex flex-row items-center gap-x-2 text-sm"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader size={16} />
                      ) : (
                        <>
                          Send
                          <SendHorizontal size={14} />
                        </>
                      )}
                    </Button>
                  </div>
                  <h1 className="font-bold mt-4 text-blue-400">Preview</h1>
                  <PollQuestion question={pollQuestion} choices={choices} />
                </>
              )}
            </TabsContent>

            <TabsContent
              value="polls"
              className="py-4 flex flex-col overflow-y-auto h-full "
            >
              <div className="flex flex-col bg-black h-full">
                <h1 className="font-bold">Active Polls</h1>
                {/* Display active polls here */}
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddPollSheet;
