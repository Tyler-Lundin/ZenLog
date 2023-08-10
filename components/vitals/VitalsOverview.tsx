"use client"
import { AppDispatch, RootState } from "@/_store";
import { MOODS } from "@/configs/moods.config";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import postVitalsThunk from "@/_store/thunks/postVitalsThunk";

export default function VitalsOverview() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>()

  const currentMood = MOODS.find(m => m.value === mood.value);
  const handleSubmit = () => dispatch(postVitalsThunk())

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <div className="border border-black dark:border-white grid place-content-center">
        <div className=" border backdrop-blur-md flex gap-2">
          <h1 className="text-2xl ">MOOD: </h1>
          <h1 className="text-xl font-bold">{currentMood?.name}</h1>
          <h1 className="text-xl font-bold">{currentMood?.icon}</h1>
        </div>

        <div className=" border backdrop-blur-md flex gap-2">
          <h1 className="text-xl ">BODYWEIGHT:</h1>
          <h1 className="text-xl font-bold">{bodyweight.value} lbs</h1>
        </div>

        <div className=" border backdrop-blur-md flex gap-2">
          <h1 className="text-xl ">SLEEP:</h1>
          <h1 className="text-xl font-bold">{sleep.value} hrs</h1>
        </div>
      </div>

      <Button className={`w-60 rounded-t-none`} variant={"glassBlue"} onClick={handleSubmit}>Log Vitals</Button>
    </div>
  )
}
