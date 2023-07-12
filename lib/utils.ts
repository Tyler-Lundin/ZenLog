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

