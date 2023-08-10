import { Mood } from "@prisma/client"

export interface Payload {
  success: boolean
  statusCode: number
}

export interface DateObject {
  month: number
  day: number
  year: number
}

export type Entry<T> = { value: T, status: Status }
type Status = 'INCOMPLETE' | 'COMPLETE' | 'SKIPPED'


export interface PostVitalsRequestBody {
  bodyweight: Entry<number>
  mood: Entry<Mood>
  sleep: Entry<number>
  userDayId: string
}
