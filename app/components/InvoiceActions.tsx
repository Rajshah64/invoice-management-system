"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  Clipboard,
  DownloadCloud,
  MoreHorizontal,
  Pencil,
  Send,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface iAppProps {
  id: string;
  status: string;
}

export function InvoiceActions({ id, status }: iAppProps) {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending Reminder...",
        success: "Reminder Sent!",
        error: "Failed to send reminder email",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText("id_123456")}
              className="cursor-pointer"
            >
              Copy payment ID
            </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <button
            type="button"
            className="flex items-center w-full"
            onClick={() => navigator.clipboard.writeText(id)}
          >
            <Clipboard className="size-4 mr-2" />
            Copy invoice ID
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <Pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloud className="size-4 mr-2" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Send className="size-4 mr-2" />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Trash className="size-4 mr-2" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/paid`}>
            <CheckCircle className="size-4 mr-2" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
