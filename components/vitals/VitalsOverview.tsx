"use client"
import { AppDispatch, RootState } from "@/_store";
import { MOODS } from "@/configs/moods.config";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import postVitalsThunk from "@/_store/thunks/postVitalsThunk";
import { Activity } from "lucide-react";

export default function VitalsOverview() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>()

  const currentMood = MOODS.find(m => m.value === mood.value);
  const handleSubmit = () => dispatch(postVitalsThunk())

  return (
    <div className="w-screen h-screen fixed top-0 left-0  grid place-content-center">
      <div className="bg-blue-400 grid place-content-center w-full rounded-t-md py-1">
      </div>

      <div className="px-4 bg-white dark:bg-black">
        <div className="place-self-center grid grid-cols-2 items-center gap-2">
          <h1 className="text-md sm:text-lg justify-self-end">Mood</h1>
          <div className="flex gap-2">
            <h1 className="text-md sm:text-lg font-thin">{currentMood?.name.toLowerCase()}</h1>
            <h1 className="text-md sm:text-lg ">{currentMood?.icon}</h1>
          </div>
        </div>

        {bodyweight.value !== 0 && (
          <div className="place-self-center grid grid-cols-2 items-center gap-2">
            <h1 className="text-md sm:text-lg justify-self-end">Bodyweight</h1>
            <h1 className="text-xl font-thin">{bodyweight.value} <span className="text-sm self-center"> lbs </span></h1>
          </div>
        )}


        {sleep.value !== 0 && (
          <div className="place-self-center grid grid-cols-2 items-center gap-2">
            <h1 className="text-md sm:text-lg justify-self-end">Sleep</h1>
            <h1 className="text-xl font-thin">{sleep.value} <span className="text-sm self-center"> hrs </span></h1>
          </div>
        )}

      </div>
      <Button className={`w-full rounded-t-none text-white font-black`} size="2xl" variant={"glassBlue"} onClick={handleSubmit}>Log Vitals</Button>
    </div>
  )
}
