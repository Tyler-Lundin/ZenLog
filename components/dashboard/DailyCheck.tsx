'use client';
import { useState } from "react"
import BodyweightStep from "./steps/BodyweightStep"
import MoodStep from "./steps/MoodStep"
import SleepStep from "./steps/SleepStep"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { Button } from "../ui/button";
import postDailyCheck from "@/store/thunks/postDailyCheckThunk";
import { setDailyCheckIsDone } from "@/store/appSlice";


export default function DailyCheck() {
  console.log("rendering daily check in")
  const { isDone } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const [step, setStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const steps = [
    { component: <BodyweightStep key="body_weight_step" />, isDone: isDone.weight || false },
    { component: <MoodStep key="mood_step" />, isDone: isDone.mood || false },
    { component: <SleepStep key="sleep_step" />, isDone: isDone.sleep || false },
  ]

  const numNotDone = steps.filter(step => !step.isDone).length - 1
  const isLastStep = step === numNotDone
  const isFirstStep = step === 0

  const handleNext = () => {
    if (isLastStep) return console.log("done")
    setStep(step + 1)
  }

  const handleDone = () => {
    dispatch(postDailyCheck());
    dispatch(setDailyCheckIsDone());
  }

  const handleBack = () => {
    if (isFirstStep) return console.log("first step")
    setStep(step - 1)
  }

  const currentStep = steps[step]
  const allDone = steps.every(step => step.isDone)
  if (allDone) return null;
  if (currentStep.isDone) handleNext();

  return (
    <div className="absolute top-0 left-0 w-screen h-screen dark:bg-black backdrop-blur-md grid place-content-center dark:text-white bg-white z-50">
      {!currentStep.isDone && currentStep.component}
      <div className="flex justify-between absolute top-0 left-0 w-full p-8">
        <Button variant="ghost" onClick={handleBack} disabled={isFirstStep}>Back</Button>
        <Button variant="ghost" onClick={isLastStep ? handleDone : handleNext}>{isLastStep ? "Done" : "Next"}</Button>
      </div>
    </div>
  )
}
