import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function NewActivityForm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="gap-2 border-b-2 border-b-neutral-300 bg-white p-6 flex flex-row items-center"
          variant="ghost"
        >
          <div className="bg-pink-200 p-1 rounded-md">
            <Plus size={18} className="text-pink-600" />
          </div>
          Add A New Activity
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Activity</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Enter the details of the new activity below.
        </AlertDialogDescription>
        <form className="space-y-4 p-4">
          <div>
            <label
              htmlFor="activityName"
              className="block text-sm font-medium text-gray-700"
            >
              Activity Name
            </label>
            <Input
              className="w-full h-full bg-white   border-b-4 border-b-neutral-300 text-neutral-700"
              placeholder=""
            />
          </div>
          <div>
            <label
              htmlFor="activityDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="activityDescription"
              id="activityDescription"
              // rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="activityImage"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              name="activityImage"
              id="activityImage"
              className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save Activity</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
