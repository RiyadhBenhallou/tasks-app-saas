import { User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-secondary text-primary container mx-auto px-8 py-4 flex justify-between items-center">
      <div className="font-bold text-lg">Task App</div>
      <div className="">
        <User />
      </div>
    </div>
  );
}
