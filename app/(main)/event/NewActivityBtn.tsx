import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const NewActivityBtn = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Button
        className=" gap-2 border-b-2 border-b-neutral-300 bg-white p-6  flex flex-row items-center "
        variant="ghost"
      >
        <div className="bg-pink-200 p-1 rounded-md">
          <Plus size={22} className="text-pink-600" />
        </div>
        Add A New Activity
      </Button>
    </div>
  );
};

export default NewActivityBtn;
