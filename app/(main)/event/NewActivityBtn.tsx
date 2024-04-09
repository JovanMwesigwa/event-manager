import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
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
        <div className="bg-pink-200 p-1 rounded-md">
          {loading ? (
            <Loader size={22} className="text-pink-600" />
          ) : (
            <Plus size={22} className="text-pink-600" />
          )}
        </div>
        {isEditing ? "Save the activity" : "Add an activity"}
      </Button>
    </div>
  );
};

export default NewActivityBtn;
