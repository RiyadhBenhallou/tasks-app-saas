import { User } from "lucide-react";
import { Button } from "./button";
import { createClient } from "@/lib/supabase/server";

export default function Navbar() {
  return (
    <div className="bg-secondary text-primary container mx-auto px-8 py-4 flex justify-between items-center">
      <div className="font-bold text-lg">Task App</div>
      <div className="">
        <form
          action={async () => {
            "use server";
            const supabase = await createClient();
            await supabase.auth.signOut();
          }}
        >
          <Button>Log Out</Button>
        </form>
        <User />
      </div>
    </div>
  );
}
