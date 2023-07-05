import { ExerciseSet } from "@prisma/client"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRepsWeightAndUnit(set: ExerciseSet) {
  const { reps, weight, weightUnit } = set
  if (reps > 0 && weight !== 0) return `${reps} x ${weight} ${weightUnit}`
  if (reps > 0 && weight === 0) return `${reps} reps`
  if (reps === 0 && weight !== 0) return `${weight} ${weightUnit}`
  return 'Missing Weight and Reps'
}

export function formatLeadingZero(num: string | number) {
  return String(num).replace(/^0+(?=\d)/, '');
}

