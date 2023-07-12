import { AppDispatch } from "@/_store";
import BodyweightStep from "@/components/dashboard/steps/BodyweightStep";
import MoodStep from "@/components/dashboard/steps/MoodStep";
import SleepStep from "@/components/dashboard/steps/SleepStep";
import { RootState } from "@/_store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "@/_store/slices/dashboardSlice";

export default function useDailyCheck() {
  const { currentStep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();
  const STEPS = [
    <BodyweightStep key={`step-0`} />,
    <MoodStep key={`step-1`} />,
    <SleepStep key={`step-2`} />,
  ]

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // const handleClose = () => dispatch(setDailyCheckIsDone())
  // const handleSubmit = () => dispatch(postDailyCheck())

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
    handleClose: () => null,
    handleSubmit: () => null,
    isLastStep,
    isFirstStep,
    isDone: false,
  }


}
