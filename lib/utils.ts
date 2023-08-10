import { DateObject } from "@/types/global"
import { UserDay } from "@prisma/client"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRepsWeightAndUnit({ reps, weight, weightUnit = 'lbs' }: { reps: number, weight: number, weightUnit?: string }) {
  if (reps > 0 && weight !== 0) return `${reps} x ${weight} ${weightUnit}`
  if (reps > 0 && weight === 0) return `${reps} reps`
  if (reps === 0 && weight !== 0) return `${weight} ${weightUnit}`
  return 'Missing Weight and Reps'
}

export function formatLeadingZero(num: string | number): string {
  return String(num).replace(/^0+(?=\d)/, '');
}


export const dateToTime = (date: string) => {
  const D = new Date(date)
  return D.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export function getWeekNumber(d: Date): number {
  let date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

export function getWeekOfYear(day: number, month: number, year: number): number {
  let date = new Date(year, month - 1, day);
  return getWeekNumber(date);
}

export const getWeekday = (day: UserDay | DateObject | Date) => {
  if (day instanceof Date) {
    const weekday = day.toLocaleDateString('en-US', { weekday: 'short' })
    return weekday
  }
  const date = new Date(day.year, day.month - 1, day.day)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  return weekday
}
