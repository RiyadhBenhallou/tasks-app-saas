import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTaskDialog from "./_components/create-task-dialog";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="h-svh w-full mt-24 gap-2">
      <Card className="max-w-xl bg-secondary mx-auto p-6 flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-bold">My Tasks</h1>
          <CreateTaskDialog>
            <Button>
              <Plus className="mr-2" />
              Create Task
            </Button>
          </CreateTaskDialog>
        </div>
      </Card>
    </div>
  );
}
