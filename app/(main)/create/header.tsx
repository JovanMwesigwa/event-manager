import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const CreateHeader = () => {
  return (
    <div className="w-full items-center justify-between flex-row flex pl-3">
      <Select>
        <SelectTrigger className="custom-select-trigger w-[180px] border-b-4 border-b-neutral-300">
          <SelectValue placeholder="Personal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="custom-select-trigger w-[180px] border-b-4 border-b-neutral-300">
          <SelectValue placeholder="Public" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CreateHeader;
