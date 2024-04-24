"use client";

import { Loader } from "lucide-react";

const EventsLoadingPage = () => {
  return (
    <div className="flex items-center w-full h-full flex-1 justify-center">
      <Loader size={32} className="animate-spin" />
    </div>
  );
};

export default EventsLoadingPage;
