import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sizes = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];

export const productSortings = [
  { label: "Default", value: "default" },
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

export const priceSortings = [
  { label: "Increasing", value: "increasing" },
  { label: "Decreasing", value: "decreasing" },
];

export const orderStatuses = [
  "unverified",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];
