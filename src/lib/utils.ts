import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.AUTH_URL ??
    "http://localhost:3000";

  return new URL(path, baseUrl).toString();
}

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function arrayMove<T>(items: T[]) {
  return items.map((item, index) => ({
    ...item,
    sortOrder: index
  }));
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
