import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditTaskForm } from "./_components/edit-task-form";

export default function Page() {
  return (
    <div className="h-svh w-full mt-24">
      <Card className="max-w-xl bg-secondary mx-auto p-6 flex flex-col gap-4">
        <CardHeader>
          <h1 className="text-lg font-bold">Task Details</h1>
        </CardHeader>
        <CardContent className="w-full">
          <EditTaskForm />
        </CardContent>
      </Card>
    </div>
  );
}
