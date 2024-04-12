// src/stores/timer-store.ts
import database from "@/firebase/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { create } from "zustand";

interface TimerData {
  startTime: number;
  duration: number;
  paused: boolean;
}

interface TimerState {
  timerData: TimerData | null;
  setTimerData: (data: TimerData | null) => void;
  calculateTimeRemaining: () => number;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timerData: null,
  setTimerData: (data) => set({ timerData: data }),
  calculateTimeRemaining: () => {
    const state = get();

    const { timerData } = state;

    if (!timerData || timerData.paused)
      return timerData ? timerData.duration : 0;

    const elapsed = Math.floor(
      (new Date().getTime() - timerData.startTime) / 1000
    );

    return Math.max(timerData.duration - elapsed, 0);
  },
}));

export const initializeTimer = (activityId: string) => {
  const timerRef = ref(database, `timers/${activityId}`);

  onValue(timerRef, (snapshot) => {
    const data: TimerData | null = snapshot.val();
    useTimerStore.getState().setTimerData(data);
  });
};
