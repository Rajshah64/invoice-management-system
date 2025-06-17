import { requireUser } from "@/app/utils/hooks";
import { client } from "@/app/utils/mailtrap";
import { prisma } from "@/app/utils/prisma";
import { addDays, format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(
  requests: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const session = await requireUser();
  const { invoiceId } = await params;
  const invoiceData = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session.user?.id as string,
    },
  });
  if (!invoiceData) {
    return new Response("Invoice not found", { status: 404 });
  }

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "rajviralshah@gmail.com",
    },
  ];

  const finalDate = addDays(invoiceData.date, invoiceData.dueDate);
  // here we are using the mailtrap client to send an email to the user with the invoice details.
  // finaldate is the date when the invoice is due.
  // we are using the addDays function to add the invoice pdf.
  // the invoice pdf is generated using the data from the form.

  try {
    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: "fe04d860-6c27-45c9-8bd1-6da9dffe0714",
        template_variables: {
          first_name: invoiceData.clientName,
          company_info_name: "Invoicely",
          company_info_address: "Kandivali West",
          company_info_city: "Mumbai",
          company_info_zip_code: "400001",
          company_info_country: "India",
        },
      })
      .then(console.log)
      .catch(console.error);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to send Email reminder",
      },
      { status: 500 }
    );
  }
}
