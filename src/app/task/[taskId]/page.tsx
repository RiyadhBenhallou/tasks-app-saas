import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditTaskForm } from "../_components/edit-task-form";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const supabase = await createClient();
  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();
  return (
    <div className="h-svh w-full mt-24">
      <Card className="max-w-xl bg-secondary mx-auto p-6 flex flex-col gap-4">
        <CardHeader>
          <h1 className="text-lg font-bold">Task Details</h1>
        </CardHeader>
        <CardContent className="w-full">
          <EditTaskForm task={task} />
        </CardContent>
      </Card>
    </div>
  );
}
