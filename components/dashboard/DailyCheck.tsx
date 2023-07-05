'use client';
import { useState, useEffect, useCallback } from "react"
import BodyweightStep from "./steps/BodyweightStep"
import MoodStep from "./steps/MoodStep"
import SleepStep from "./steps/SleepStep"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { Button } from "../ui/button";
import postDailyCheck from "@/store/thunks/postDailyCheckThunk";
import { setDailyCheckIsDone } from "@/store/appSlice";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function DailyCheck() {
  const { isDone } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(0);

  const steps = [
    { component: <BodyweightStep key="body_weight_step" />, isDone: isDone.weight || false },
    { component: <MoodStep key="mood_step" />, isDone: isDone.mood || false },
    { component: <SleepStep key="sleep_step" />, isDone: isDone.sleep || false },
  ]


  const numNotDone = steps.filter(step => !step.isDone).length - 1
  const isLastStep = step === numNotDone
  const isFirstStep = step === 0
  const isReadyToLog = steps.every(step => step.isDone);

  const handleNext = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }, [step, steps.length])

  const handleDone = () => {
    dispatch(postDailyCheck());
    dispatch(setDailyCheckIsDone());
  }

  const handleBack = useCallback(() => {
    if (isFirstStep) return dispatch(setDailyCheckIsDone()); // closes but reopens on next reload 
    setStep(step - 1)
  }, [dispatch, isFirstStep, step])

  const currentStep = steps[step].component
  const allDone = steps.every(step => step.isDone)
  if (steps[step]?.isDone && step < steps.length - 1) handleNext();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBack();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch, handleBack, handleNext])

  if (allDone) return null;

  return (
    <div className="bg-white/80 dark:bg-black/80 rounded-lg border py-8 border-black dark:border-white grid gap-4">
      <div className="grid grid-cols-5 justify-items-center p-2 lg:p-16 w-full items-center gap-2">
        <kbd className="text-xs hidden md:block dark:text-white text-center col-span-1">Esc</kbd>
        <span className="text-xs hidden md:block dark:text-white col-span-3 text-center">Step {step + 1} of {steps.length}</span>
        <kbd className="text-xs hidden md:block dark:text-white text-center col-span-1">Enter</kbd>
        <Button
          type="button"
          variant="default"
          size="lgSquare"
          className="p-2 col-span-1"
          onClick={handleBack}
          disabled={isFirstStep}
        > <BsChevronLeft /> </Button>

        <Button
          disabled={!isReadyToLog}
          type="button"
          variant="logEvent"
          className="p-6 text-xl lg:text-4xl font-black rounded-lg col-span-3 whitespace-nowrap"
          onClick={handleDone}
        > Log Checks </Button>

        <Button
          type="button"
          variant="default"
          size="lgSquare"
          className="p-2 col-span-1"
          onClick={handleNext}
          disabled={isLastStep}
        > <BsChevronRight /> </Button>
      </div>
      <div className="px-8 lg:px-16 grid ">
        {currentStep}
      </div>
    </div>
  )
}
