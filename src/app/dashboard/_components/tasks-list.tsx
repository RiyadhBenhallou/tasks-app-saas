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
import { Pen, Trash } from "lucide-react";

export default function TasksList() {
  return (
    <Table className="border rounded-lg">
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        <TableRow>
          <TableCell className="flex items-center">
            <Checkbox className="" />
          </TableCell>
          <TableCell>Complete Project Proposal</TableCell>
          <TableCell className="text-center">
            <p className="inline-block p-0.5 px-1 border-1 border-blue-500 bg-blue-200 rounded-full text-blue-500 w-auto text-xs text-center">
              Personal
            </p>
          </TableCell>
          <TableCell>
            <p className="text-center">12-09-2004</p>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2 justify-end">
              <Pen className="text-blue-500 hover:text-blue-700 w-4">Edit</Pen>
              <Trash className="text-red-500 hover:text-red-700 w-4">
                Delete
              </Trash>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
