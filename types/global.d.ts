import { ExerciseEntry, ExerciseSet, FoodEntry, JournalEntry, MeditateEntry, Mood, MoodEntry, SleepEntry, WaterEntry } from "@prisma/client"




type backgroundColor = [string, string, string, string]


export interface Date {
  id?: string
  month: number
  day: number
  year: number
  exerciseEntries: ExerciseEntry[]
  foodEntries: FoodEntry[]
  waterEntries: WaterEntryr[]
  sleepEntries: SleepEntry[]
  journalEntries: JournalEntry[]
  moodEntries: MoodEntryn[]
  meditateEntries: MeditateEntry[]
}

export interface Settings {
  isCookiesEnabled: boolean
  backgroundColors: backgroundColor
}

export interface AppState {
  date: Date,
  dashboard: Dashboard,
  settings: Settings
}

export interface Dashboard {
  exercise: ExerciseAppState
  dailyCheckIn: DailyCheckInState
}

export interface ExerciseAppState {
  newExercise: Omit<ExerciseEntry, "id" | "userId" | "updatedAt" | "createdAt" | "dateId"> & {
    isDone: boolean
  }
  newTags: string[]
}

export interface DailyCheckInState {
  weight: number
  mood: Mood
  sleep: number
  isDone: boolean
}







