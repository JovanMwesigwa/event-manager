"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDeleteEvent from "@/hooks/reactquery/useDeleteEvent";
import { EllipsisVertical, Loader, Trash2 } from "lucide-react";

const DeleteEventPop = ({ eventId }: { eventId: number }) => {
  const { mutate, isPending, error } = useDeleteEvent();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="border text-xs border-neutral-300 p-1 rounded-sm h-8 w-8"
        >
          <EllipsisVertical size={16} className="text-neutral-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-1">
        <div className="w-full flex flex-row items-center p-0">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={() => mutate(eventId)}
            className="text-xs  p-1 rounded-sm  px-3 h-8 w-full flex flex-row justify-start gap-x-2 font-bold"
          >
            {isPending ? (
              <>
                <Loader size={18} />
                Removing...
              </>
            ) : (
              <>
                <Trash2 size={18} className="text-red-500 font-bold" />
                DELETE
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteEventPop;
