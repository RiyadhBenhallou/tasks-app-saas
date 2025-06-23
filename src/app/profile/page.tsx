import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, LogOut } from "lucide-react";

export default function Page() {
  return (
    <div className="h-svh w-full mt-24">
      <Card className="max-w-xl bg-secondary mx-auto p-6 flex flex-col gap-4">
        <CardHeader>
          <h1 className="text-lg font-bold">User Profile</h1>
        </CardHeader>
        <CardContent className="w-full">
          <Card className="bg-secondary p-4">
            <CardHeader>
              <h1 className="font-medium text-md">User Information</h1>
            </CardHeader>
            <CardContent>
              <div className="fex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Name:</span>
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span>
                  <span>JohnDoes</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary p-4 mt-4">
            <CardHeader>
              <h1 className="text-md font-medium">Subscription Information</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Current Plan:</span>
                  <span>Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tasks Created:</span>
                  <span>128</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Storage Used:</span>
                  <span>2.3 GB / 10 GB</span>
                </div>
                <div className="">
                  <Button className="">
                    <CreditCard />
                    Manage Subscription
                  </Button>{" "}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-end">
            <Button className="" variant={"outline"}>
              <LogOut className="text-primary" />
              <span className="text-primary">Sign Out</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
