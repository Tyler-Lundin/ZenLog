'use client';
import useVitals from "@/hooks/useVitals";
import StepControls from "../StepControls";
import VitalsButton from "./VitalsButton";


export default function VitalsSteps() {
  const { STEPS, currentStep, isDone, isLastStep, isFirstStep, isVitalsOpen, nextStep, prevStep, handleClose, handleSubmit, handleOpen } = useVitals();
  const stepControlsProps = { isLastStep, isFirstStep, nextStep, prevStep, handleClose, handleSubmit }


  if (!isVitalsOpen) return <VitalsButton onClick={handleOpen} />
  return (
    <div className="fixed top-0 left-0 z-50 h-screen py-20 w-screen bg-white/80 dark:bg-black/80 backdrop-blur-sm grid place-content-center">
      <StepControls {...stepControlsProps} />
      {STEPS[currentStep]}
    </div>
  )
}
