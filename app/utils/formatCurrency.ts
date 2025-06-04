import { Currency } from "lucide-react";

interface iAppcurrrency{
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "CHF" | "CNY" | "INR";
}


export function formatCurrency({amount, currency}: iAppcurrrency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
