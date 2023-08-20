'use client';
import useVitals from "@/hooks/useVitals";
import StepControls from "../StepControls";
import VitalsButton from "./VitalsButton";
import BodyweightStep from "./steps/BodyweightStep";
import MoodStep from "./steps/MoodStep";
import SleepStep from "./steps/SleepStep";
import VitalsOverview from "../vitals/VitalsOverview";

const STEPS = [
  <BodyweightStep key={`step-0`} />,
  <MoodStep key={`step-1`} />,
  <SleepStep key={`step-2`} />,
  <VitalsOverview key={`step-3`} />,
]

export const VITALS_LENGTH = STEPS.length;

export default function VitalsSteps() {
  const { currentStep, isFirstStep, isVitalsOpen, nextStep, prevStep, handleClose, handleSubmit, handleOpen } = useVitals();
  const isLastStep = currentStep === VITALS_LENGTH - 1;
  const stepControlsProps = { isLastStep, isFirstStep, nextStep, prevStep, handleClose, handleSubmit }
  if (!isVitalsOpen) return <VitalsButton onClick={handleOpen} />
  return (
    <div className="fixed top-0 left-0 z-50 h-screen py-20 w-screen bg-white/80 dark:bg-black/80 backdrop-blur-sm grid justify-center">
      <StepControls {...stepControlsProps} />
      {STEPS[currentStep]}
    </div>
  )
}
