import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInCalendarDays, format, isAfter, isBefore, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid(): string {
  return crypto.randomUUID();
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMM yyyy");
  } catch {
    return dateStr;
  }
}

export function daysUntil(dateStr: string): number {
  try {
    return differenceInCalendarDays(parseISO(dateStr), new Date());
  } catch {
    return 0;
  }
}

export function isUpcoming(dateStr: string): boolean {
  try {
    return isAfter(parseISO(dateStr), new Date());
  } catch {
    return false;
  }
}

export function isPast(dateStr: string): boolean {
  try {
    return isBefore(parseISO(dateStr), new Date());
  } catch {
    return false;
  }
}

export function encodeBase64Unicode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64Unicode(b64: string): string {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
}
