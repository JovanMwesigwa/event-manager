"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode, useState } from "react";

const EditPop = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Speaker Info</h4>
            <p className="text-sm text-muted-foreground">
              Add a speaker or presenter to the activity
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                className="col-span-3 h-8 rounded-sm outline-none"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxWidth">Work</Label>
              <Input
                id="maxWidth"
                className="col-span-3 h-8 rounded-sm"
                placeholder="(Optional)"
              />
            </div>
            <div className="grid grid-cols-4  gap-4">
              <Label htmlFor="height">Notes</Label>
              <Textarea
                id="height"
                className="col-span-3 h-8 outline-none rounded-sm"
                placeholder="(Optional)"
              />
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-end gap-x-2">
            <Button
              onClick={() => setOpen(false)}
              className="p-1 px-3 border-none rounded-sm text-sm"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="p-1 px-4 border-none rounded-sm text-sm "
              //   variant="ghost"
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPop;
