"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TasksList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });
      return data;
    },
  });
  return (
    <Table className="border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className=""></TableHead>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead className="text-center w-[100px]">Label</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="flex items-center">
              <Checkbox
                checked={task.completed}
                onCheckedChange={async (state) => {
                  await supabase
                    .from("tasks")
                    .update({ completed: state })
                    .eq("id", task.id);
                  queryClient.invalidateQueries({ queryKey: ["tasks"] });
                  // Optionally, trigger a refetch or update local state here
                }}
                className=""
              />
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell className="text-center">
              <p className="inline-block p-0.5 px-1 border-1 border-blue-500 bg-blue-200 rounded-full text-blue-500 w-auto text-xs text-center">
                {task.label}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-center">
                {task.due_date ? format(task.due_date, "yyyy-MM-dd") : ""}
              </p>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 justify-end">
                <Pen
                  className="text-blue-500 hover:text-blue-700 w-4"
                  onClick={() => {
                    router.push(`/task/${task.id}`);
                  }}
                >
                  Edit
                </Pen>
                <Trash
                  className="text-red-500 hover:text-red-700 w-4"
                  onClick={async () => {
                    console.log("deleting");
                    const { error } = await supabase
                      .from("tasks")
                      .delete()
                      .eq("id", task.id);
                    if (error) {
                      console.log(error);
                    }
                    queryClient.invalidateQueries({ queryKey: ["tasks"] });
                  }}
                >
                  Delete
                </Trash>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
