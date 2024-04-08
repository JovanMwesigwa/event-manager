import { InfoModal } from "@/app/components/Modals/InfoModal";
import { Button } from "@/components/ui/button";
import useGetEvent from "@/hooks/reactquery/useGetEvent";
import { useEventActions } from "@/hooks/useEventActions";
import useJumpToActivity from "@/hooks/useJumpToActivity";
import React from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { MdSkipNext } from "react-icons/md";

const CardButtons = ({
  eventId,
  activityId,
  paused,
}: {
  activityId: number;
  eventId: number;
  paused: boolean;
}) => {
  const { jumpToActivityMutation } = useJumpToActivity({
    activityId,
    eventId,
  });

  const {
    startMutation,
    pauseMutation,
    stopMutation,
    jumpToNextActivityMutation,
  } = useEventActions({
    eventId,
    paused,
  });

  const { data, error, isLoading, isError } = useGetEvent(1);

  if (!data || isLoading || isError) {
    return;
  }

  const nowActive = !data.isPaused && data.active && !paused;

  return (
    <div className="bg-yellow-h-full w-full flex flex-1 flex-col">
      <div className="flex flex-row items-center w-full gap-x-3 h-full justify-between">
        <Button
          onClick={() => stopMutation.mutate()}
          disabled={stopMutation.isPending}
          variant="ghost"
          className={`border w-full border-b-2 border-b-neutral-300 ${
            nowActive && "bg-white border-b-2 border-b-red-500"
          }`}
        >
          {/* <FaStop size={13} /> */}
          <p>Stop</p>
        </Button>

        {data.isPaused && !data.active ? (
          <InfoModal
            title="Would you like to start the event?"
            describe="Start the even to run through your activities"
            btnText="Start"
            onClick={() => startMutation.mutate()}
            disabled={startMutation.isPending}
            nowActive={nowActive}
            eventPaused={data.isPaused}
          />
        ) : (
          <>
            {paused ? (
              <Button
                onClick={() => {
                  data.isPaused
                    ? startMutation.mutate()
                    : jumpToActivityMutation.mutate();
                }}
                disabled={
                  jumpToActivityMutation.isPending || startMutation.isPending
                }
                variant="ghost"
                className={`border w-full border-b-2 border-b-neutral-300  ${
                  nowActive && "bg-white border-b-2 border-b-green-500"
                } ${
                  data.isPaused && "bg-white border-b-2 border-b-yellow-500"
                }`}
              >
                {/* <FaPlay size={12} /> */}
                <p>Play</p>
              </Button>
            ) : (
              <Button
                onClick={() => pauseMutation.mutate()}
                disabled={pauseMutation.isPending}
                variant="ghost"
                className={`border w-full border-b-2 border-b-neutral-300  ${
                  nowActive && "bg-white border-b-2 border-b-yellow-500"
                }`}
              >
                {/* <FaPause size={12} /> */}
                <p>Pause</p>
              </Button>
            )}
          </>
        )}

        <Button
          onClick={() => jumpToNextActivityMutation.mutate()}
          disabled={jumpToNextActivityMutation.isPending}
          variant="ghost"
          className={`border w-full border-b-2 border-b-neutral-300  ${
            nowActive && "bg-white border-b-2 border-b-blue-500"
          }`}
        >
          {/* <MdSkipNext size={25} /> */}
          <p>Next</p>
        </Button>
      </div>
    </div>
  );
};

export default CardButtons;
