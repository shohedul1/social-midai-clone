import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

// Function to merge class names
export function cn(...inputs: (string | undefined | null)[]): string {
  return twMerge(clsx(inputs));
}

// Function to format date into a human-readable distance string
export const formatDate = (date: string): string => {
  const parsedDate = parseISO(date); // Ensure date is parsed correctly
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

// Function to format date in DD/MM/YYYY format
export const formatDateInDDMMYYYY = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-GB");
};
