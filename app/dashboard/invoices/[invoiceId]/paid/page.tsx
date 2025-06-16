import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import paidImg from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButton";
import { MarkInvoiceAsPaid } from "@/app/actions";
import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";



type Params = Promise<{ invoiceId: string }>;

async function Authorize(invoiceId: string, userId: string) {
  const data= await prisma.invoice.findUnique({
    where :{
      userId:userId,
      id:  invoiceId,
    }
  });
  if(!data){
    return redirect("/dashboard/invoices");
  }
}

export default async function MarkAsPaid({
  params,
}: {
  params: Params;
}) {
  const session = await requireUser();
  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Mark as Paid??</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid? This action
            cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={paidImg} alt="Paid" />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await MarkInvoiceAsPaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark as Paid" variant="outline" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
