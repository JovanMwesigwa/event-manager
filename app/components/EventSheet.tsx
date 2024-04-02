import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronsRightIcon,
  SeparatorHorizontal,
  SheetIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PollQuestion from "./PollQuestion";

const EventSheet = () => {
  return (
    <div className="flex w-full justify-end md:px-4 py-2 cursor-pointer ">
      <Sheet>
        <SheetTrigger>
          <ChevronsRightIcon className="text-neutral-400 size-3 md:size-4" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full md:w-[800px] md:m-3 md:rounded-md max-h-screen"
        >
          {/* Engaments and Polls */}
          <Tabs defaultValue="details" className="w-full py-5 overflow-y-auto">
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
                    <div className="flex flex-row items-center gap-2">
                      <SheetTitle className="text-sm">Starts:</SheetTitle>
                      <SheetTitle className="text-sm">9:30 AM</SheetTitle>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <SheetTitle className="text-sm">Stops:</SheetTitle>
                      <SheetTitle className="text-sm">10:30 AM</SheetTitle>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <SheetTitle className="text-sm">Hosted By:</SheetTitle>
                      <SheetTitle className="text-sm">
                        St: Marks Choir
                      </SheetTitle>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between my-4">
                  <SheetTitle>Worship Session</SheetTitle>
                  <SheetTitle>03:12:23</SheetTitle>
                </div>
              </SheetHeader>

              <SheetTitle className="text-neutral-500 text-sm ">
                About the activity
              </SheetTitle>

              <Separator className="my-4" />

              <SheetDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                amet rerum cumque impedit ea suscipit animi reiciendis
                perferendis laudantium doloremque? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quas amet rerum cumque impedit ea
                suscipit animi reiciendis perferendis laudantium doloremque?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                amet rerum cumque impedit ea suscipit animi reiciendis
                perferendis laudantium doloremque?
              </SheetDescription>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EventSheet;
