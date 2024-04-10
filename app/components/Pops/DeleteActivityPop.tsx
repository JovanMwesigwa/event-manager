"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDeleteActivity from "@/hooks/reactquery/useDeleteActivity";
import { EllipsisVertical, Loader, Trash2 } from "lucide-react";

const DeleteActivityPop = ({ activityId }: { activityId: number }) => {
  const mutation = useDeleteActivity();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="border-none text-xs border-neutral-300 p-1 rounded-sm h-8 w-8"
        >
          <EllipsisVertical size={16} className="text-neutral-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-1">
        <div className="w-full flex flex-row items-center p-0">
          <Button
            variant="ghost"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(activityId)}
            className="text-xs  p-1 rounded-sm  px-3 h-8 w-full flex flex-row justify-start gap-x-2 font-bold"
          >
            {mutation.isPending ? (
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

export default DeleteActivityPop;
