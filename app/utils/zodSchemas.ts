import { z } from "zod";

export const onboardingSChema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "last name is required"),
  address: z.string().min(2, "Address is required"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required"),
  total: z.number().min(1, "1 is the minimum value"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(1, "Due date is required").default(15),
  fromName: z.string().min(2, "Your name is required"),
  fromAddress: z.string().min(2, "Your address is required"),
  fromEmail: z.string().email("Email is not valid"),
  clientName: z.string().min(2, "Client name is required"),
  clientAddress: z.string().min(2, "Client address is required"),
  clientEmail: z.string().email("Email is not valid"),
  currency: z.string().min(1, "Currency is required"),
  notes: z.string().optional(),
  invoiceNumber: z.number().min(1, "Invoice number is required"),
  invoiceItemDescription: z
    .string()
    .min(1, "Invoice item description is required"),
  invoiceItemQuantity: z.number().min(1, "Invoice item quantity is required"),
  invoiceItemRate: z.number().min(1, "Invoice item rate is required"),
});
