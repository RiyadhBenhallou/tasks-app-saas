"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns"; // Import format from date-fns for date handling

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDemo } from "@/components/date-picker"; // Assuming this component exists and is correctly implemented
import { Loader2, Router, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(), // Use .default(false) for initial values
  label: z.string().optional(),
  dueDate: z.string().optional(), // Expecting a formatted date string like "YYYY-MM-DD"
});

export function EditTaskForm({
  task,
}: {
  task: {
    id: string;
    title: string;
    description: string;
    completed: string;
    label: string;
    dueDate: string;
  };
}) {
  const queryClient = useQueryClient();
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      completed: Boolean(task.completed) as boolean,
      label: task.label,
      dueDate: task.dueDate,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("tasks")
        .update({ ...values })
        .eq("id", task.id);
      if (error) {
        console.log(error);
      }
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.back();
    });
    // Example: toast("Task updated successfully!");
  };

  return (
    <Form {...form}>
      {" "}
      {/* Removed explicit type parameter */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  placeholder="Task title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white"
                  placeholder="Task description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-white p-4">
              <FormControl>
                <Checkbox
                  className="text-white border border-primary"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Mark as completed</FormLabel>
                <FormDescription>
                  Check this box if the task is completed.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  placeholder="e.g., Personal, Work, Urgent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <DatePickerDemo
                  value={field.value} // Pass the string value to DatePickerDemo
                  onChange={(date) =>
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                  } // Convert Date object to "YYYY-MM-DD" string for the form field
                />
              </FormControl>
              <FormDescription>
                Your task will be due on this date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {!isLoading ? (
            <Save className="" />
          ) : (
            <Loader2 className="animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
