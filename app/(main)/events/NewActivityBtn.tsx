import { Button } from "@/components/ui/button";
import { Heart, Loader, Plus, Save } from "lucide-react";
import React from "react";

const NewActivityBtn = ({
  isEditing,
  submit,
  loading,
}: {
  isEditing: boolean;
  submit: any;
  loading?: boolean;
}) => {
  // if (!isEditing) return;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Button
        onClick={submit}
        disabled={loading}
        className=" gap-2 border-b-2 border-b-neutral-300 bg-white p-6  flex flex-row items-center "
        variant="ghost"
      >
        <div
          className={` ${
            !isEditing ? "bg-green-200" : " bg-blue-200"
          } p-1 rounded-md `}
        >
          {loading ? (
            <Loader size={22} className="text-pink-600" />
          ) : !isEditing ? (
            <Plus size={20} className="text-green-600" />
          ) : (
            <Save size={18} className="text-blue-400" />
          )}
        </div>
        {isEditing ? "Save the changes" : "Add an activity"}
      </Button>
    </div>
  );
};

export default NewActivityBtn;
