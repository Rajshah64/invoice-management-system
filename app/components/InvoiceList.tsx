import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";
import { prisma } from "../utils/prisma";
import { requireUser } from "../utils/hooks";
import { format } from "date-fns";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";

async function getInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      invoiceNumber: true,
      status: true,
      createdAt: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function InvoiceList() {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);

  return (
    <>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {formatCurrency({
                    amount: invoice.total,
                    currency: invoice.currency as any,
                  })}
                </TableCell>
                <TableCell>
                  <Badge>{invoice.status}</Badge>
                </TableCell>
                <TableCell>{format(invoice.createdAt, "PP")}</TableCell>
                <TableCell className="text-right">
                  <InvoiceActions status={invoice.status} id={invoice.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Invoices Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
