"use client"
import useDashboardData from "@/hooks/useDashboardData";
import NumberProgressBar from "../NumberProgressBar";
// import { useUserGoals } from "../dashboard/UserGoals";
import useIsDarkMode from "@/hooks/useIsDarkmode";

export default function ExerciseStats() {
  const { exercise } = useDashboardData();
  console.log(exercise)


  return (
    <div className="grid gap-8 py-4">
      <h2 className="text-2xl font-semibold  ">Exercise</h2>
      <div className="flex flex-wrap gap-4">
      </div>
    </div>
  )
}


export const RepsCircle = ({ totalReps, totalRepsGoal }: { totalReps: number; totalRepsGoal: number }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <div className="h-24 w-24">
      <NumberProgressBar
        trailColor={isDarkMode ? "rgb(155,155,155)" : "rgb(55,55,55)"}
        pathColor="rgb(244, 67, 54)"
        value={totalReps}
        goal={totalRepsGoal}
        label={"reps"}
      />
    </div>
  )
}

export const WeightCircle = ({ totalWeight, totalWeightGoal }: { totalWeight: number; totalWeightGoal: number }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <div className="h-24 w-24">
      <NumberProgressBar
        trailColor={isDarkMode ? "rgb(155,155,155)" : "rgb(55,55,55)"}
        pathColor="rgb(255, 152, 0)"
        value={totalWeight}
        goal={totalWeightGoal}
        label={"lbs"}
      />
    </div>
  )
}

export const VolumeCircle = ({ totalVolume, totalVolumeGoal }: { totalVolume: number; totalVolumeGoal: number }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <div className="h-24 w-24">
      <NumberProgressBar
        trailColor={isDarkMode ? "rgb(155,155,155)" : "rgb(55,55,55)"}
        pathColor="rgb(100, 181, 246)"
        value={totalVolume}
        goal={totalVolumeGoal}
        label={"volume"}
      />
    </div>
  )
}


export const EntriesCircle = ({ totalEntries, totalEntriesGoal }: { totalEntries: number; totalEntriesGoal: number }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <div className="h-24 w-24">
      <NumberProgressBar
        trailColor={isDarkMode ? "rgb(155,155,155)" : "rgb(55,55,55)"}
        pathColor="rgb(76,175,80)"
        value={totalEntries}
        goal={totalEntriesGoal}
        label={"entries"}
      />
    </div>
  )
}

