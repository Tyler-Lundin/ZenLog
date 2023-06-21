import { ExerciseEntry, ExerciseSet, FoodEntry, JournalEntry, MeditateEntry, Mood, MoodEntry, SleepEntry, WaterEntry } from "@prisma/client"




type backgroundColor = [string, string, string, string]


export interface Date {
  id?: string
  month: number
  day: number
  year: number
  ExerciseEntries: ExerciseEntry[]
  FoodEntries: FoodEntry[]
  JournalEntries: JournalEntry[]
  MeditateEntries: MeditateEntry[]
  MoodEntries: MoodEntry[]
  SleepEntries: SleepEntry[]
  WeightEntries: WeightEntry[]
  WaterEntries: WaterEntry[]
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
  dailyCheck: DailyCheckState
}

export interface ExerciseAppState {
  newExercise: Omit<ExerciseEntry, "userId" | "updatedAt" | "createdAt" | "dateId"> & {
    step: number
    isDone: boolean
  }
  newTags: string[]
}

export interface DailyCheckState {
  weight: number
  mood: Mood
  sleep: number
  isDone: {
    weight: boolean
    mood: boolean
    sleep: boolean
  }
}







