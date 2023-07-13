'use client';
import { useEffect, useCallback } from "react"
import { nextDailyEntryStep, previousDailyEntryStep, setDailyEntryIsDone } from "@/_store/slices/dashboardSlice";
import BodyweightStep from "./steps/BodyweightStep"
import MoodStep from "./steps/MoodStep"
import SleepStep from "./steps/SleepStep"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/_store"
import { Button } from "../ui/button";
import postDailyCheck from "@/_store/thunks/postDailyCheckThunk";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function DailyCheck() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();

  type O = typeof mood | typeof bodyweight | typeof sleep
  const isDone = (obj: O) => obj.status === 'COMPLETE'

  const steps = [
    { component: <BodyweightStep key="body_weight_step" />, isDone: isDone(bodyweight) },
    { component: <MoodStep key="mood_step" />, isDone: isDone(mood) },
    { component: <SleepStep key="sleep_step" />, isDone: isDone(sleep) },
  ]


  const numNotDone = steps.filter(step => !step.isDone).length - 1
  const isLastStep = currentStep === numNotDone
  const isFirstStep = currentStep === 0
  const isReadyToLog = steps.every(step => step.isDone);

  const handleNext = useCallback(() => {
    if (!isLastStep) {
      dispatch(nextDailyEntryStep())
    }
  }, [isLastStep, dispatch])

  const handleDone = () => {
    dispatch(postDailyCheck());
    dispatch(setDailyEntryIsDone());
  }

  const handleBack = useCallback(() => {
    if (!isFirstStep) dispatch(previousDailyEntryStep());
  }, [dispatch, isFirstStep])

  const allDone = steps.every(step => step.isDone)

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
        {steps[currentStep].component}
      </div>
    </div>
  )
}
