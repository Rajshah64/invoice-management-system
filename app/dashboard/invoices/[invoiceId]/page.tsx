import EditInvoice from "@/app/components/EditInvoice";
import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/app/utils/prisma";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{ invoiceId: string }>;
// params in next js 15 is a promise
// so we need to get the folder name and get the invoiceId from it

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getData(invoiceId, session.user?.id as string);
  console.log("data", data);
  return (
    <>
      <EditInvoice data={data}    />
      
    </>
  );
}
