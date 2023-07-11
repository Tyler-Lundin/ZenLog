import { AppDispatch } from "@/_store";
import BodyweightStep from "@/components/dashboard/steps/BodyweightStep";
import MoodStep from "@/components/dashboard/steps/MoodStep";
import SleepStep from "@/components/dashboard/steps/SleepStep";
import { nextDailyCheckStep, previousDailyCheckStep, setDailyCheckIsDone } from "@/store/appSlice";
import { RootState } from "@/store/store";
import postDailyCheck from "@/store/thunks/postDailyCheckThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDailyCheck() {
  const { isDone, step } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch<AppDispatch>();
  const STEPS = [
    <BodyweightStep key={`step-0`} />,
    <MoodStep key={`step-1`} />,
    <SleepStep key={`step-2`} />,
  ]

  const isLastStep = step === STEPS.length - 1;
  const isFirstStep = step === 0;

  const handleClose = () => dispatch(setDailyCheckIsDone())

  const handleSubmit = () => dispatch(postDailyCheck())

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter' && !isLastStep) {
        e.preventDefault();
        dispatch(nextDailyCheckStep())
      }
      if (e.key === 'Escape' && !isFirstStep) {
        e.preventDefault();
        dispatch(previousDailyCheckStep())
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch, isLastStep, isFirstStep])

  return {
    currentStep: STEPS[step],
    nextStep: () => !isLastStep ? dispatch(nextDailyCheckStep()) : null,
    prevStep: () => !isFirstStep ? dispatch(previousDailyCheckStep()) : null,
    handleClose,
    handleSubmit,
    isDone,
    isLastStep,
    isFirstStep,
  }


}
