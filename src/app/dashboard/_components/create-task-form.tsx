"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { createTaskWithAi } from "../actions";
import { Title } from "@radix-ui/react-dialog";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
});

export default function CreateTaskForm() {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const supabase = createClient();
      // const {
      //   data: { session },
      // } = await supabase.auth.getSession();
      // const { error, data } = await supabase.functions.invoke(
      //   "create-task-with-ai",
      //   {
      //     body: {
      //       title: values.title,
      //       description: values.description,
      //     },
      //     headers: {
      //       Authorization: `Bearer ${session?.access_token}`,
      //     },
      //   }
      // );
      await createTaskWithAi(values.title, values.description);

      console.log(values);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="bg-white" placeholder="shadcn" {...field} />
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
                  rows={4}
                  placeholder="Enter a description for your task"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
          Create Task
        </Button>
      </form>
    </Form>
  );
}
