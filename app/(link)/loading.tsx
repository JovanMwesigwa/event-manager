"use client";

import { Loader } from "lucide-react";
import React from "react";

const EventLoadingPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader size={32} />
    </div>
  );
};

export default EventLoadingPage;
