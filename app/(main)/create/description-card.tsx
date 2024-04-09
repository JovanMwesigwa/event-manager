import { Textarea } from "@/components/ui/textarea";
import { NotebookText } from "lucide-react";
import React from "react";

const DescriptionCard = ({
  description,
  setDescription,
}: {
  description: string;
  setDescription: any;
}) => {
  return (
    <div className="flex w-full justify-between  ml-3 mb-5">
      <div className="flex flex-1 justify-between h-full flex-col gap-3 p-4 bg-neutral-200 rounded-md ">
        <div className="w-full h-full flex flex-row justify-between">
          <div className="flex flex-row  gap-1 ">
            <NotebookText className="w-6 h-6" />
            <h1>Description</h1>
          </div>

          <Textarea
            className="w-1/2 h-full bg-white focus:outline-none border-b-4 border-b-neutral-300 text-neutral-700 outline-none"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;
