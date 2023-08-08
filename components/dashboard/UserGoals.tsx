import { BodyweightGoal, SleepGoal, ExerciseGoal, MeditateGoal } from "@prisma/client"


// type WeightGoal {
//   target Int
// }
//
// type SleepGoal {
//   totalSleep Int
// }
//
// type ExerciseGoal {
//   totalReps    Int
//   totalEntries Int
//   totalVolume  Int
//   totalWeight  Int
// }
//
// type MeditateGoal {
//   totalTime Int
// }
//
// type WaterGoal {
//   totalOunces  Int
//   totalCups    Int
//   totalGallons Int
// }

export function useUserGoals() {

  const bodyweightGoal: BodyweightGoal = {
    target: 185
  }
  const sleepGoal: SleepGoal = {
    totalSleep: 8
  }
  const exerciseGoal: ExerciseGoal = {
    totalReps: 100,
    totalEntries: 10,
    totalVolume: 10000,
    totalWeight: 1000
  }
  const meditateGoal: MeditateGoal = {
    totalTime: 10
  }

  return {
    bodyweightGoal,
    sleepGoal,
    exerciseGoal,
    meditateGoal,
  }
}


export default function UpdateUserGoals() {
  return (
    <form>
      UPDATE USER GOALS HERE
    </form>
  )
}
