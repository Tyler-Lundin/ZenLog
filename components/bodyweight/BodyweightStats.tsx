"use client"
import useDashboardData from "@/hooks/useDashboardData";
import NumberProgressBar from "../NumberProgressBar";
import { useUserGoals } from "../dashboard/UserGoals";
import useIsDarkMode from "@/hooks/useIsDarkmode";

export default function BodyweightStats() {
  const { bodyweight } = useDashboardData();
  const { bodyweightGoal } = useUserGoals();

  console.log(bodyweight);

  return (
    <div className="grid gap-8 py-4">
      <h2 className="text-2xl font-semibold  ">Bodyweight</h2>
      <div className="flex flex-wrap gap-4">
        <AverageWeightCircle averageBodyweight={bodyweight.averageBodyweight} targetBodyweight={bodyweightGoal.target} />
      </div>
    </div>
  )
}


export const AverageWeightCircle = ({ averageBodyweight, targetBodyweight }: { averageBodyweight: number; targetBodyweight: number }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <div className="h-24 w-24">
      <NumberProgressBar
        trailColor={isDarkMode ? "rgb(155,155,155)" : "rgb(55,55,55)"}
        pathColor="rgb(244, 67, 54)"
        value={averageBodyweight}
        goal={targetBodyweight}
        label={"lbs"}
      />
    </div>
  )
}

