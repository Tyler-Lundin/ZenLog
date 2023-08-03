'use client';
import useDashboardData from "@/hooks/useDashboardData";
import NumberProgressBar from "../NumberProgressBar";
import { useUserGoals } from "./UserGoals";


export default function DashboardStats() {
  const { sleep, weight, mood, exercise } = useDashboardData();
  const { sleepGoal, exerciseGoal } = useUserGoals();

  const STATS = [
    {
      title: "EXERCISE",
      stats: [
        {
          title: "Total Reps",
          value: exercise.totalReps || 0,
          abbreviation: "reps"
        },
        {
          title: "Total Weight",
          value: exercise.totalWeight || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Volume",
          value: exercise.totalVolume || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Entries",
          value: exercise.totalExercises || 0,
          abbreviation: exercise.totalExercises > 1 || exercise.totalExercises === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "SLEEP",
      stats: [
        {
          title: "Total Hours",
          value: sleep.totalHours || 0,
          abbreviation: "hrs"
        },
        {
          title: "Total Entries",
          value: sleep.sleepEntries || 0,
          abbreviation: sleep.sleepEntries > 1 || sleep.sleepEntries === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "MOOD",
      stats: [
        {
          title: "Latest Mood",
          value: mood.mostRecentMood || 'unknown',
        },
        {
          title: "Total Entries",
          value: mood.moodEntries || 0,
          abbreviation: mood.moodEntries > 1 || mood.moodEntries === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "BODYWEIGHT",
      stats: [
        {
          title: "Average Weight",
          value: weight.averageWeight || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Entries",
          value: weight.weightEntries || 0,
          abbreviation: weight.weightEntries > 1 || weight.weightEntries === 0 ? 'entries' : 'entry'
        },
      ]
    }
  ]

  return (
    <div className=" font-light text-lg dark:text-white px-4 w-full shadow-2xl shadow-white dark:shadow-black py-2 grid gap-8">
      <h1 className="text-2xl font-bold">Stats</h1>
      <div className="">
        <div className="grid gap-2">

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">Exercise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-8">

              <div className="h-24 w-24">
                <NumberProgressBar
                  pathColor="rgba(120, 195, 155)"
                  value={exercise.totalReps}
                  goal={exerciseGoal.totalReps}
                  label={"reps"} />
              </div>
              <div className="h-24 w-24">
                <NumberProgressBar
                  pathColor="rgba(120, 120, 205)"
                  value={exercise.totalWeight}
                  goal={exerciseGoal.totalWeight}
                  label={"lbs"}
                />
              </div>
              <div className="h-24 w-24">
                <NumberProgressBar value={exercise.totalVolume} goal={exerciseGoal.totalVolume} label={"volume"} />
              </div>
              <div className="h-24 w-24">
                <NumberProgressBar
                  pathColor="rgba(220, 220, 75)"
                  value={exercise.totalExercises}
                  goal={exerciseGoal.totalEntries}
                  label={exercise.totalExercises > 1 || exercise.totalExercises === 0 ? 'entries' : 'entry'} />
              </div>


            </div>
          </div>


        </div>
      </div>
    </div >
  )
}
