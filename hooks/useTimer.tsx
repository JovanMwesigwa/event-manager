import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import database from "@/firebase/firebaseConfig";

interface TimerData {
  startTime: number;
  duration: number;
  paused: boolean;
  pausedAt?: number;
}

const useTimer = (activityId: string) => {
  const [timerData, setTimerData] = useState<TimerData | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const timerRef = ref(database, `timers/${activityId}`);

    const unsubscribe = onValue(timerRef, (snapshot) => {
      const data: TimerData | null = snapshot.val();
      setTimerData(data);

      if (data) {
        const now = Date.now();
        if (data.paused && data.pausedAt) {
          setElapsedTime(data.pausedAt - data.startTime);
        } else if (!data.paused) {
          setElapsedTime(now - data.startTime);
        }
      }
    });

    return () => unsubscribe();
  }, [activityId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerData && !timerData.paused) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerData]);

  // Calculate seconds remaining based on the elapsed time
  const secondsRemaining = timerData
    ? Math.max(timerData.duration - Math.floor(elapsedTime / 1000), 0)
    : 0;

  // Convert seconds to hours, minutes, and seconds
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formattedTime = formatTime(secondsRemaining);
  const isLoading = !timerData;

  return { formattedTime, isLoading, secondsRemaining };
};

export default useTimer;
