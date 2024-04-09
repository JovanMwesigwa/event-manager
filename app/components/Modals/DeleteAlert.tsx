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
import useDeleteActivity from "@/hooks/reactquery/useDeleteActivity";
import { Activity } from "@prisma/client";
import { Loader, Trash } from "lucide-react";

export function DeleteAlert({ item }: { item: Activity }) {
  const mutation = useDeleteActivity();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer group relative">
          <Trash className="text-red-500 size-4 hover:size-5 absolute top-0 transition-all" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>&quot;{item.title}&quot;</strong> will be permanently
            deleted from your event catalog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(item.id)}>
            {mutation.isPending ? <Loader className="size-4" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
