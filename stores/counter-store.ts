// src/stores/counter-store.ts

import { create } from "zustand";

export type CounterState = {
  count: number;
};

export type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type CounterStore = CounterState & CounterActions;

const createCounterStore = () =>
  create<CounterStore>((set) => ({
    count: 0, // Initialize the count here, or use new Date().getFullYear() if needed
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));

export const useCounterStore = createCounterStore();
