// src/stores/timer-store.ts
import create from "zustand";

interface TimerState {
  secondsRemaining: number;
  setSecondsRemaining: (
    update: number | ((prevSeconds: number) => number)
  ) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  secondsRemaining: 0,
  setSecondsRemaining: (update) =>
    set((state) => ({
      secondsRemaining:
        typeof update === "function" ? update(state.secondsRemaining) : update,
    })),
}));
