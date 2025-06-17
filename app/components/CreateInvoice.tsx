"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export function CreateInvoice({
  firstName,
  lastName,
  address,
  email,
}: iAppProps) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    //onBlur is used to validate the form when the user leaves the input field
    shouldRevalidate: "onInput",
    //onInput is used to validate the form when the user types in the input field
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const calculateTotal = rate * quantity;
  const [currency, setCurrency] = useState("USD");
  const [isDateUpdating, setIsDateUpdating] = useState(false);
  // const [date, setDate] = useState<Date>()
  // const [netTerm, setNetTerm] = useState<string>("15")

  // // Calculate due date
  // const dueDate = (() => {
  //     if (!date || !netTerm) return null;
  //     const days = parseInt(netTerm, 10);
  //     const result = new Date(date);
  //     result.setDate(result.getDate() + days);
  //     return result;
  // })();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form
          id={form.id}
          action={action}
          onSubmit={(e) => {
            if (isDateUpdating) {
              e.preventDefault();
              return;
            }
            form.onSubmit(e);
          }}
          noValidate
        >
          <input type="hidden" />
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
            readOnly
          />
          <input
            type="hidden"
            key={fields.total.key}
            name={fields.total.name}
            value={calculateTotal}
          />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center justify-between gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="test 123"
              />
            </div>
            <p className="text-red-500 text-sm">
              {fields.invoiceName.errors ? fields.invoiceName.errors : null}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label className="mb-2" htmlFor="customer">
                Invoice No.
              </Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="5"
                />
              </div>
              <p className="text-red-500 text-sm">
                {fields.invoiceNumber.errors
                  ? fields.invoiceNumber.errors
                  : null}
              </p>
            </div>
            <div>
              <Label className="mb-2">Currency</Label>
              <Select
                defaultValue="USD"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                  <SelectItem value="GBP">British Pound -- GBP</SelectItem>
                  <SelectItem value="JPY">Japanese Yen -- JPY</SelectItem>
                  <SelectItem value="AUD">Australian Dollar -- AUD</SelectItem>
                  <SelectItem value="CAD">Canadian Dollar -- CAD</SelectItem>
                  <SelectItem value="CHF">Swiss Franc -- CHF</SelectItem>
                  <SelectItem value="CNY">Chinese Yuan -- CNY</SelectItem>
                  <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">
                {fields.currency.errors ? fields.currency.errors : null}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-1 space-y-2">
              <Label>From</Label>
              <Input
                name={fields.fromName.name}
                key={fields.fromName.key}
                placeholder="YOUR NAME"
                defaultValue={`${firstName} ${lastName}`}
              />
              <p className="text-red-500 text-sm">
                {fields.fromName.errors ? fields.fromName.errors : null}
              </p>
              <Input
                name={fields.fromEmail.name}
                key={fields.fromEmail.key}
                placeholder="YOUR EMAIL"
                defaultValue={email}
              />
              <p className="text-red-500 text-sm">
                {fields.fromEmail.errors ? fields.fromEmail.errors : null}
              </p>
              <Input
                name={fields.fromAddress.name}
                key={fields.fromAddress.key}
                placeholder="YOUR ADDRESS"
                defaultValue={address}
              />
              <p className="text-red-500 text-sm">
                {fields.fromAddress.errors ? fields.fromAddress.errors : null}
              </p>
            </div>

            <div className="col-span-1 space-y-2">
              <Label>To</Label>
              <Input
                name={fields.clientName.name}
                key={fields.clientName.key}
                defaultValue={fields.clientName.initialValue}
                placeholder="CUSTOMER NAME"
              />
              <p className="text-red-500 text-sm">
                {fields.clientName.errors ? fields.clientName.errors : null}
              </p>
              <Input
                name={fields.clientEmail.name}
                key={fields.clientEmail.key}
                defaultValue={fields.clientEmail.initialValue}
                placeholder="CUSTOMER EMAIL"
              />
              <p className="text-red-500 text-sm">
                {fields.clientEmail.errors ? fields.clientEmail.errors : null}
              </p>
              <Input
                name={fields.clientAddress.name}
                key={fields.clientAddress.key}
                defaultValue={fields.clientAddress.initialValue}
                placeholder="CUSTOMER ADDRESS"
              />
              <p className="text-red-500 text-sm">
                {fields.clientAddress.errors
                  ? fields.clientAddress.errors
                  : null}
              </p>
            </div>
          </div>

          {/* <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <Label className="mb-2">Invoice Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label className="mb-2">Payment Terms</Label>
                            <Select value={netTerm} onValueChange={setNetTerm}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Payment Terms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">Next 15 days</SelectItem>
                                    <SelectItem value="30">Next 30 days</SelectItem>
                                    <SelectItem value="60">Next 60 days</SelectItem>
                                </SelectContent>
                            </Select>
                            {date && netTerm && dueDate && (
                                <div className="mt-2 text-sm text-muted-foreground">
                                    Bill should be paid by <span className="font-medium">{format(dueDate, "PPP")}</span>
                                </div>
                            )}
                        </div>
                    </div> */}

          <div className="grid md:grid-cols-2 gap-6 mt-6 mb-6">
            <div>
              <div className="mb-2">
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start "
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  {/* <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date || new Date());
                    }}
                    fromDate={new Date()}
                  /> */}
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setIsDateUpdating(true);
                      setSelectedDate(date || new Date());
                      setTimeout(() => setIsDateUpdating(false), 10); // allow state to update before submit
                    }}
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
            </div>
            <div>
              <div className="mb-2">
                <Label>Invoice Due</Label>
              </div>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue="0"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Due on Reciept" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                  <SelectItem value="60">Net 60</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  placeholder="Item name & description"
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.name}
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  disabled
                  value={formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between py-2 borde-t">
                <span>Total ({currency})</span>
                <span className="font-medium underline-offset-2">
                  {formatCurrency({
                    amount: calculateTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
              name={fields.notes.name}
              key={fields.notes.key}
              defaultValue={fields.notes.initialValue}
              placeholder="Add your Note/s right here ..."
            />
            <p className="text-red-500 text-sm">{fields.notes.errors}</p>
          </div>

          <div className="flex justify-end items-center mt-6">
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
