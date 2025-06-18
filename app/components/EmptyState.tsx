import { buttonVariants } from "@/components/ui/button";
import { Ban, Icon, PlusCircle } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50 ">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 mb-4">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Please Create an Invoice!!</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground">
        Hey you haven&apos;t created any invoice, please create one.
      </p>
      <Link href="/dashboard/invoices/create" className={buttonVariants()}>
        <PlusCircle className="size-4 mr-2" />
        Create invoice
      </Link>
    </div>
  );
}
