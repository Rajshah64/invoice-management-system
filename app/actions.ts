"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSChema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import { prisma } from "./utils/prisma";
import { client } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
import { addDays, format } from "date-fns";
// import { Prisma, PrismaClient } from "@prisma/client";

export async function onboardUser(prevState: any, formData: FormData) {
  // const prisma = new PrismaClient();
  // type UserUpdateInput = Prisma.UserUpdateInput;
  // this was done because I was getting an error that my local prisma client was outdated even when I ran the npx prisma generate command.
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: onboardingSChema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      notes: submission.value.notes,
      status: submission.value.status,
      total: submission.value.total,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "rajshah1759979@gmail.com",
    },
  ];

  const finalDate = addDays(submission.value.date, submission.value.dueDate);
  // here we are using the mailtrap client to send an email to the user with the invoice details.
  // finaldate is the date when the invoice is due.
  // we are using the addDays function to add the invoice pdf.
  // the invoice pdf is generated using the data from the form.
  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "61635a68-1fe7-4424-8e1d-68e57ff04715",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        dueDate: format(finalDate, "PP"),
        totalAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as any,
        }),
        invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
      },
    })
    .then(console.log)
    .catch(console.error);

  return redirect("/dashboard/invoices");
}

export async function updateInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      notes: submission.value.notes,
      status: submission.value.status,
      total: submission.value.total,
    },
  });

  // const sender = {
  //   email: "hello@demomailtrap.co",
  //   name: "Mailtrap Test",
  // };
  // const recipients = [
  //   {
  //     email: "rajshah1759979@gmail.com",
  //   },
  // ];

  // const finalDate = addDays(submission.value.date, submission.value.dueDate);

  // client
  //   .send({
  //     from: sender,
  //     to: recipients,
  //     template_uuid: "61635a68-1fe7-4424-8e1d-68e57ff04715",
  //     template_variables: {
  //       clientName: submission.value.clientName,
  //       invoiceNumber: submission.value.invoiceNumber,
  //       dueDate: format(finalDate, "PP"),
  //       totalAmount: formatCurrency({
  //         amount: submission.value.total,
  //         currency: submission.value.currency as any,
  //       }),
  //       invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
  //     },
  //   })
  //   .then(console.log)
  //   .catch(console.error);

  //my free version of mailtrap is not allowing me to send emails so I commented this out.
  // I will uncomment this when I get the paid version of mailtrap.
  // also change the template_uuid as you have two separate templates for the create invoice and the update invoice.

  return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });
  return redirect("/dashboard/invoices");
}
