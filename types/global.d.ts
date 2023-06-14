



type backgroundColor = [string, string, string, string]


export interface Date {
  id?: String
  month: number
  day: number
  year: number
  exerciseEntries: ExerciseEntry[]
  foodEntries: String[]
  waterEntries: String[]
  sleepEntries: String[]
  journalEntries: String[]
  moodEntries: String[]
  meditateEntries: String[]
}

export interface Settings {
  isCookiesEnabled: boolean
  backgroundColors: backgroundColor
}

export interface AppState {
  date: Date,
  settings: Settings
}


