import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import CreateTaskForm from "./create-task-form";

export default function CreateTaskDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="text-black">
        <DialogTitle>Create Task</DialogTitle>
        <DialogDescription>Enter you task info</DialogDescription>
        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  );
}
