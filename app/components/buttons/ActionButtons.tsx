"use client";

import { Button } from "@/components/ui/button";
import { useEventActions } from "@/hooks/useEventActions";
import {
  Loader,
  PauseIcon,
  PlayIcon,
  Redo,
  Redo2,
  StopCircleIcon,
} from "lucide-react";

const ActionButtons = ({
  active,
  paused,
  stopped,
  eventId,
}: {
  paused: boolean;
  active: boolean;
  stopped: boolean;
  eventId: number;
}) => {
  const {
    startMutation,
    pauseMutation,
    stopMutation,
    jumpToNextActivityMutation,
  } = useEventActions({
    eventId,
    paused,
  });

  return (
    <div className="flex flex-row items-center gap-2 ">
      {paused ? (
        <Button
          disabled={startMutation.isPending}
          onClick={() => startMutation.mutate()}
          size="sm"
          className={` ${
            paused && active ? "bg-yellow-500" : " bg-green-500"
          } text-white`}
        >
          {startMutation.isPending && startMutation.isSuccess ? (
            <Loader size={18} />
          ) : (
            <PlayIcon
              size={18}
              className={`${paused && active && "heartbeat"}`}
            />
          )}
        </Button>
      ) : (
        <Button
          disabled={pauseMutation.isPending}
          onClick={() => pauseMutation.mutate()}
          size="sm"
          className="bg-blue-950 text-white"
        >
          {pauseMutation.isPending && pauseMutation.isSuccess ? (
            <Loader size={18} />
          ) : (
            <PauseIcon size={18} />
          )}
        </Button>
      )}

      <Button
        disabled={jumpToNextActivityMutation.isPending}
        onClick={() => jumpToNextActivityMutation.mutate()}
        size="sm"
        className="bg-blue-500 text-white"
      >
        <Redo size={18} />
      </Button>

      <Button
        disabled={stopMutation.isPending}
        onClick={() => stopMutation.mutate()}
        size="sm"
        className="bg-red-500 text-white"
      >
        <StopCircleIcon size={18} />
      </Button>
    </div>
  );
};

export default ActionButtons;
