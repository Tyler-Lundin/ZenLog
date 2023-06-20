'use client';
import { useState } from "react"
import BodyweightStep from "./steps/BodyweightStep"
import MoodStep from "./steps/MoodStep"
import SleepStep from "./steps/SleepStep"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { setDailyCheckIsDone } from "@/store/appSlice"
import { Button } from "../ui/button";


export default function DailyCheckIn() {
  console.log("rendering daily check in")
  const { isDone } = useSelector((state: RootState) => state.app.dashboard.dailyCheckIn)
  const [step, setStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const steps = [
    <BodyweightStep key="body_weight_step" />,
    <MoodStep key="mood_step" />,
    <SleepStep key="sleep_step" />,
  ]

  const isLastStep = step === steps.length - 1
  const isFirstStep = step === 0

  const handleNext = () => {
    if (isLastStep) return console.log("done")
    setStep(step + 1)
  }

  const handleDone = () => {
    dispatch(setDailyCheckIsDone(true));
  }

  const handleBack = () => {
    if (isFirstStep) return console.log("first step")
    setStep(step - 1)
  }

  const currentStep = steps[step]

  if (isDone) return null;
  return (
    <div className="absolute top-0 left-0 w-screen h-screen dark:bg-black backdrop-blur-md grid place-content-center dark:text-white bg-white z-50">
      {currentStep}
      <div className="flex justify-between absolute top-0 left-0 w-full p-8">
        <Button variant="ghost" onClick={handleBack} disabled={isFirstStep}>Back</Button>
        <Button variant="ghost" onClick={isLastStep ? handleDone : handleNext}>{isLastStep ? "Done" : "Next"}</Button>
      </div>
    </div>
  )
}
