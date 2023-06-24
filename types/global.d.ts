import { ExerciseEntry, ExerciseSet, FoodEntry, JournalEntry, MeditateEntry, Mood, MoodEntry, SleepEntry, WaterEntry } from "@prisma/client"




type backgroundColor = [string, string, string, string]


export interface DateState {
  id: string
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
  ids: {
    ExerciseEntries: string[]
    FoodEntries: string[]
    JournalEntries: string[]
    MeditateEntries: string[]
    MoodEntries: string[]
    SleepEntries: string[]
    WeightEntries: string[]
    WaterEntries: string[]
  }
}

export interface Settings {
  isCookiesEnabled: boolean
  backgroundColors: backgroundColor
}

export interface AppState {
  date: DateState,
  dashboard: Dashboard,
  settings: Settings
}

export interface Dashboard {
  exercise: ExerciseAppState
  dailyCheck: DailyCheckState
}

interface StepsState { isDone: boolean, step: number };

export type NewExerciseSetState =
  ExerciseSet & StepsState;

export interface ExerciseAppState {
  newExercise: Omit<ExerciseEntry, "userId" | "updatedAt" | "createdAt" | "dateId"> & {
    set: NewExerciseSetState
  } & StepsState
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







