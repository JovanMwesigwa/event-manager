import useJumpToActivity from "@/hooks/useJumpToActivity";
import { PlayIcon } from "lucide-react";
import React from "react";

const CardButtons = ({
  activeActivityId,
  activityId,
}: {
  activityId: number;
  activeActivityId: number | null;
}) => {
  const { jumpToActivityMutation } = useJumpToActivity({
    activityId,
    activeActivityId,
  });
  return (
    <div className="w-full flex flex-row items-center justify-end">
      <div
        className="cursor-pointer"
        onClick={() => jumpToActivityMutation.mutate()}
      >
        <PlayIcon className="size-3 text-green-500" />
      </div>
    </div>
  );
};

export default CardButtons;
