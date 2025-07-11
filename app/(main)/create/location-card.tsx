import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React from "react";

const EventLocationCard = ({
  location,
  setLoction,
}: {
  location: string;
  setLoction: any;
}) => {
  return (
    <div className="flex w-full items-center justify-between  ml-3 mb-5">
      <div className="flex flex-1 justify-between h-full flex-col gap-3 p-4 bg-neutral-200 rounded-md ">
        <div className="w-full h-full items-center flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <MapPin className="w-6 h-6" />
            <h1>Location</h1>
          </div>

          <Input
            className="w-1/2 h-full bg-neutral--100 border-b-4 border-b-neutral-300 text-neutral-700"
            placeholder="Enter location"
            required
            value={location}
            onChange={(e) => setLoction(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EventLocationCard;
