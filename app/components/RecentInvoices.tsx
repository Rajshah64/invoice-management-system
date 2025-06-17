import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utils/prisma";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      total: true,
      clientName: true,
      clientEmail: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc", // Order by most recent invoices in descending order
    },
    take: 7, // Limit to 7 most recent invoices
  });
  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4 " key={item.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {/*slice is a function that returns a portion of a string. in the above code, it is used to get the first two characters of the client's name */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {item.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium ">+{formatCurrency({
                amount: item.total,
                currency: item.currency as "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "CHF" | "CNY" | "INR",
            })}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
