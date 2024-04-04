// useTimer hook (simplified version for illustration)

import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import database from "@/firebase/firebaseConfig";

interface TimerData {
  startTime: number;
  duration: number;
  paused: boolean;
}

const useTimer = (activityId: string) => {
  const [timerData, setTimerData] = useState<TimerData | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    const timerRef = ref(database, `timers/${activityId}`);
    const unsubscribe = onValue(timerRef, (snapshot) => {
      const data: TimerData | null = snapshot.val();
      setTimerData(data);
      if (data && !data.paused) {
        const elapsed = Math.floor(
          (new Date().getTime() - data.startTime) / 1000
        );
        setSecondsRemaining(Math.max(data.duration - elapsed, 0));
      }
    });

    return () => unsubscribe();
  }, [activityId]);

  useEffect(() => {
    if (timerData && !timerData.paused) {
      const interval = setInterval(() => {
        const elapsed = Math.floor(
          (new Date().getTime() - timerData.startTime) / 1000
        );
        setSecondsRemaining(Math.max(timerData.duration - elapsed, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerData]);

  // Convert seconds to hours, minutes, and seconds
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formattedTime = timerData ? formatTime(secondsRemaining) : null;
  const isLoading = !timerData;

  return { formattedTime, isLoading, secondsRemaining };
};

export default useTimer;
