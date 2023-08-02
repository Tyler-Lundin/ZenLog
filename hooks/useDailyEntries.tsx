import { AppDispatch } from "@/_store";
import BodyweightStep from "@/components/dashboard/steps/BodyweightStep";
import MoodStep from "@/components/dashboard/steps/MoodStep";
import SleepStep from "@/components/dashboard/steps/SleepStep";
import { RootState } from "@/_store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entry, nextStep, prevStep } from "@/_store/slices/dashboardSlice";
import postDailyEntriesThunk from "@/_store/thunks/postDailyEntriesThunk";
import { toggleDailyEntry } from "@/_store/slices/uiSlice";
import { Mood } from "@prisma/client";

const isComplete = (o: Entry<number | Mood>) => o.status === 'COMPLETE';

export default function useDailyEntries() {
  const { currentStep, mood, bodyweight, sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const { isDailyEntryOpen } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch<AppDispatch>();
  const STEPS = [
    <BodyweightStep key={`step-0`} />,
    <MoodStep key={`step-1`} />,
    <SleepStep key={`step-2`} />,
  ]

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const isDone = mood.status === 'COMPLETE' && bodyweight.status === 'COMPLETE' && sleep.status === 'COMPLETE';
  console.log({ isDone, mood, bodyweight, sleep })

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter' && !isLastStep) {
        e.preventDefault();
        dispatch(nextStep())
      }
      if (e.key === 'Escape' && !isFirstStep) {
        e.preventDefault();
        dispatch(prevStep())
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch, isLastStep, isFirstStep])

  return {
    STEPS,
    currentStep,
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    handleClose: () => dispatch(toggleDailyEntry()),
    handleSubmit: () => dispatch(postDailyEntriesThunk()),
    handleOpen: () => dispatch(toggleDailyEntry()),
    isLastStep,
    isFirstStep,
    isDone,
    isDailyEntryOpen,
  }
}
