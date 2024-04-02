import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronsRightIcon } from "lucide-react";
import PollQuestion from "./PollQuestion";
import { EventActivityType } from "@/types";

const EventSheet = ({ event }: { event: EventActivityType }) => {
  return (
    <div className="flex w-full justify-end  py-2 cursor-pointer ">
      <Sheet>
        <SheetTrigger>
          <ChevronsRightIcon className="text-neutral-400 size-3 md:size-4" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full md:w-[800px] md:m-3 md:rounded-md max-h-screen"
        >
          {/* Engaments and Polls */}
          <Tabs defaultValue="engage" className="w-full py-5 overflow-y-auto">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="engage">
                Engagements
              </TabsTrigger>
              <TabsTrigger className="w-full" value="details">
                Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="engage" className="py-4 flex flex-col">
              <PollQuestion />
            </TabsContent>

            {/* Details */}
            <TabsContent value="details" className="overflow-y-auto">
              <SheetHeader>
                <div className="w-full flex-row flex gap-3">
                  <div className="size-32 rounded-md bg-neutral-300"></div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2 w-full justify-between">
                      <SheetTitle className="text-sm">Starts:</SheetTitle>
                      <SheetTitle className="text-sm">{event.start}</SheetTitle>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-full justify-between">
                      <SheetTitle className="text-sm">Stops:</SheetTitle>
                      <SheetTitle className="text-sm">{event.end}</SheetTitle>
                    </div>
                    <div className="flex flex-row items-center gap-2 w-full justify-between">
                      <SheetTitle className="text-sm">Hosted By:</SheetTitle>
                      <SheetTitle className="text-sm">{event.host}</SheetTitle>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between my-4">
                  <SheetTitle>{event.title}</SheetTitle>
                  <SheetTitle>{event.currentTime}</SheetTitle>
                </div>
              </SheetHeader>

              <Separator className="my-4" />

              <SheetTitle className="text-neutral-400 font-bold text-sm mb-3">
                About the activity
              </SheetTitle>

              <SheetDescription>{event.description}</SheetDescription>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EventSheet;
