"use client";

import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import database from "@/firebase/firebaseConfig";
import { Loader } from "lucide-react";

interface TimerData {
  startTime: number;
  duration: number;
  paused: boolean;
}

const FireTimer = ({ activityId }: { activityId: string }) => {
  const [timerData, setTimerData] = useState<TimerData | null>(null);

  useEffect(() => {
    const timerRef = ref(database, `timers/${activityId}`);
    const unsubscribe = onValue(timerRef, (snapshot) => {
      const data: TimerData | null = snapshot.val();
      setTimerData(data);
    });

    return () => unsubscribe();
  }, [activityId]);

  const calculateTimeRemaining = () => {
    if (!timerData || timerData.paused) return timerData?.duration || 0;
    const elapsed = Math.floor(
      (new Date().getTime() - timerData.startTime) / 1000
    );
    return Math.max(timerData.duration - elapsed, 0);
  };

  const [secondsRemaining, setSecondsRemaining] = useState(
    calculateTimeRemaining()
  );

  useEffect(() => {
    if (timerData && !timerData.paused) {
      const interval = setInterval(() => {
        setSecondsRemaining(calculateTimeRemaining());
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

  return (
    <>
      {timerData ? <>{formatTime(secondsRemaining)}</> : <Loader size={24} />}
    </>
  );
};

export default FireTimer;
