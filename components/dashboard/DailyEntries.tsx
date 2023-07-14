'use client';
import useDailyEntries from "@/hooks/useDailyEntries";
import StepControls from "../StepControls";
import { Button } from "../ui/button";


export default function DailyEntries() {
  const { isDone, currentStep, isLastStep, isFirstStep, isDailyEntryOpen, nextStep, prevStep, handleClose, handleSubmit, handleOpen } = useDailyEntries();
  if (isDone) return null;
  if (!isDailyEntryOpen) return <Button variant="defaultInverted" className="py-8 font-bold uppercase bg-yellow-300 dark:bg-gradient-to-r dark:from-purple-900 dark:to-red-900 bg-gradient-to-r shadow from-blue-200 to-pink-200 rounded-md text-4xl w-fit m-4 dark:text-white" onClick={handleOpen}>Daily Entries</Button>
  const stepControlsProps = { isLastStep, isFirstStep, nextStep, prevStep, handleClose, handleSubmit, }

  return (
    <div className="py-8 grid gap-4 relative dark:bg-gradient-to-r dark:from-purple-900 dark:to-red-900 bg-gradient-to-r from-blue-100 to-pink-100">
      <StepControls {...stepControlsProps} />
      <div className=" lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
