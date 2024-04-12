// src/stores/eventActivityStore.ts

import { create } from "zustand";

interface EventActivityState {
  eventId: number | null;
  activeActivityId: number | null;
  setEventId: (id: number | null) => void;
  setActiveActivityId: (id: number | null) => void;
}

export const useEventActivityStore = create<EventActivityState>((set) => ({
  eventId: null,
  activeActivityId: null,
  setEventId: (id) => set({ eventId: id }),
  setActiveActivityId: (id) => set({ activeActivityId: id }),
}));
