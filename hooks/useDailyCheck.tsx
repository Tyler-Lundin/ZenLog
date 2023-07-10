import BodyweightStep from "@/components/dashboard/steps/BodyweightStep";
import MoodStep from "@/components/dashboard/steps/MoodStep";
import SleepStep from "@/components/dashboard/steps/SleepStep";
import { nextDailyCheckStep, previousDailyCheckStep } from "@/store/appSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function useDailyCheck() {
  const { isDone, step } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch();
  const STEPS = [
    <BodyweightStep key={`step-0`} />,
    <MoodStep key={`step-1`} />,
    <SleepStep key={`step-2`} />,
  ]
  return {
    currentStep: STEPS[step],
    nextStep: () => dispatch(nextDailyCheckStep()),
    prevStep: () => dispatch(previousDailyCheckStep()),
    isDone,
  }


}
