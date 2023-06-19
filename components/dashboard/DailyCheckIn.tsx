import { Mood } from "@prisma/client"
import { useState } from "react"
import { Input } from "../ui/input"
import BodyweightStep from "./steps/BodyweightStep"
import MoodStep from "./steps/MoodStep"
import SleepStep from "./steps/SleepStep"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { setDailyCheckIsDone } from "@/store/appSlice"


export default function DailyCheckIn() {

  const [step, setStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const steps = [
    { name: 'Weight', component: BodyweightStep },
    { name: 'Mood', component: MoodStep },
    { name: 'Sleep', component: SleepStep },
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

  const currentStep = steps[step].component

  return (
    <div className="absolute top-0 left-0 w-screen h-screen dark:bg-black/80 backdrop-blur-md grid place-content-center dark:text-white bg-white/80 z-50">
      {currentStep()}
      <div className="flex justify-between absolute top-0 left-0 w-full p-8">
        <button onClick={handleBack} disabled={isFirstStep}>Back</button>
        <button onClick={isLastStep ? handleDone : handleNext}>{isLastStep ? "Done" : "Next"}</button>
      </div>
    </div>
  )
}
