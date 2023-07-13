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
  const isDone = isComplete(mood) && isComplete(bodyweight) && isComplete(sleep);

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
    currentStep: STEPS[currentStep],
    nextStep: () => !isLastStep ? dispatch(nextStep()) : null,
    prevStep: () => !isFirstStep ? dispatch(prevStep()) : null,
    handleClose: () => isFirstStep ? dispatch(toggleDailyEntry(false)) : null,
    handleSubmit: () => isLastStep ? dispatch(postDailyEntriesThunk()) : null,
    handleOpen: () => dispatch(toggleDailyEntry(true)),
    isLastStep,
    isFirstStep,
    isDone,
    isDailyEntryOpen,
  }
}
