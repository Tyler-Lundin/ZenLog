import { BodyweightState, MoodState, SleepState } from "@/_store/slices/dashboardSlice"
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

// TODO: DEPRECATED STATUS, REMOVE IF NOTHING BREAKS
export type Entry<T> = { value: T, status?: Status }
type Status = 'INCOMPLETE' | 'COMPLETE' | 'SKIPPED'


export interface PostVitalsRequestBody {
  bodyweight: BodyweightState
  mood: MoodState
  sleep: SleepState
  userDayId: string
}
