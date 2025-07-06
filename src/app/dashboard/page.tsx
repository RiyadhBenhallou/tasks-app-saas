import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTaskDialog from "./_components/create-task-dialog";
import TasksList from "./_components/tasks-list";

export default async function ProtectedPage() {
  const supabase = await createClient();
  

  const { data, error } = await supabase.auth.getUser();
  console.log(data)
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="h-svh w-full mt-24">
      <Card className="max-w-xl bg-secondary mx-auto p-6 flex flex-col items-center gap-4">
        <CardHeader className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">My Tasks</h1>
            <CreateTaskDialog>
              <Button>
                <Plus className="mr-2" />
                Create Task
              </Button>
            </CreateTaskDialog>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <TasksList />
        </CardContent>
      </Card>
    </div>
  );
}
