import { RootState } from "@/_store";
import { MOODS } from "@/configs/moods.config";
import { useSelector } from "react-redux";

export default function VitalsOverview() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)

  const currentMood = MOODS.find(m => m.value === mood.value);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <div className="w-40 h-40 border backdrop-blur-md">
        <h1 className="text-2xl font-bold">{currentMood?.name}</h1>
        <h1 className="text-2xl font-bold">{currentMood?.icon}</h1>
      </div>

      <div className="w-40 h-40 border backdrop-blur-md">
        <h1 className="text-2xl font-bold">{bodyweight.value} lbs</h1>
      </div>

      <div className="w-40 h-40 border backdrop-blur-md">
        <h1 className="text-2xl font-bold">{sleep.value} hrs</h1>
      </div>
    </div>
  )
}
