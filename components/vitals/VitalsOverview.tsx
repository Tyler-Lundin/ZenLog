"use client"
import { AppDispatch, RootState } from "@/_store";
import { MOODS } from "@/configs/moods.config";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import postVitalsThunk from "@/_store/thunks/postVitalsThunk";
import { Activity } from "lucide-react";

export default function VitalsOverview() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.vitals)
  const dispatch = useDispatch<AppDispatch>()

  const currentMood = MOODS.find(m => m.value === mood.value.mood);
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

        {bodyweight.value.weight !== 0 && (
          <div className="place-self-center grid grid-cols-2 items-center gap-2">
            <h1 className="text-md sm:text-lg justify-self-end">Bodyweight</h1>
            <h1 className="text-xl font-thin">{bodyweight.value.weight} <span className="text-sm self-center"> lbs </span></h1>
          </div>
        )}


        {sleep.value.hours !== 0 && (
          <div className="place-self-center grid grid-cols-2 items-center gap-2">
            <h1 className="text-md sm:text-lg justify-self-end">Sleep</h1>
            <h1 className="text-xl font-thin">{sleep.value.hours} <span className="text-sm self-center"> hrs </span></h1>
            <h1 className="text-xl font-thin">{sleep.value.minutes} <span className="text-sm self-center"> mins </span></h1>
            <h3 className="text-md sm:text-lg justify-self-end">Quality</h3>
            <h3 className="text-xl font-thin">{sleep.value.rating} <span className="text-sm self-center"> / 10 </span></h3>

          </div>
        )}

      </div>
      <Button className={`w-full rounded-t-none text-white font-black`} size="2xl" variant={"glassBlue"} onClick={handleSubmit}>Log Vitals</Button>
    </div>
  )
}
