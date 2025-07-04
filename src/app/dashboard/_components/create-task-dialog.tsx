"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CreateTaskForm from "./create-task-form";

export default function CreateTaskDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="text-black bg-secondary">
        <DialogTitle>Create Task</DialogTitle>
        <DialogDescription>Enter you task info</DialogDescription>
        <CreateTaskForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
