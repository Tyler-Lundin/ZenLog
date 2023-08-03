'use client';
import useDailyEntries from "@/hooks/useDailyEntries";
import StepControls from "../StepControls";
import { Button } from "../ui/button";


export default function DailyEntrySteps() {
  const { STEPS, currentStep, isDone, isLastStep, isFirstStep, isDailyEntryOpen, nextStep, prevStep, handleClose, handleSubmit, handleOpen } = useDailyEntries();
  const stepControlsProps = { isLastStep, isFirstStep, nextStep, prevStep, handleClose, handleSubmit, }


  if (!isDailyEntryOpen)
    return (
      <Button
        variant="blue"
        className="font-bold uppercase rounded-md w-fit m-4 px-4 py-1 dark:text-white"
        onClick={handleOpen}>
        Vitals
      </Button>
    )
  return (
    <div className="py-8 w-screen relative">
      <StepControls type="done" {...stepControlsProps} />
      {STEPS[currentStep]}
    </div>
  )
}
