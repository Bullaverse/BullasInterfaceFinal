import { TIME_UNTIL_NEXT_GAME } from "@/constants/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasPlayedInLast24Hours(
  currentTime: number,
  lastPlayed: number,
): boolean {
  const timeDiff = currentTime - lastPlayed;
  if (timeDiff < TIME_UNTIL_NEXT_GAME) {
    return true;
  }
  return false;
}

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const calculateTimeRemaining = (
  startTime: number,
  currentTime: number,
) => {
  const timeRemaining = startTime - currentTime;
  const days = Math.floor(timeRemaining / (3600 * 24));
  const hours = Math.floor((timeRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  let timeString = "";
  if (days > 0) timeString += `${days}d `;
  if (hours > 0 || days > 0) timeString += `${hours}h `;
  if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m`;
  return timeString;
};

export const convertPointsToHoney = (points: number): number => {
  return Math.min(points / 100, 2);
};
