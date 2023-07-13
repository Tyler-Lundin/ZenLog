'use client';
import useDailyEntries from "@/hooks/useDailyEntries";
import StepControls from "../StepControls";
import { Button } from "../ui/button";


export default function DailyEntries() {
  const { isDone, currentStep, isLastStep, isFirstStep, isDailyEntryOpen, nextStep, prevStep, handleClose, handleSubmit, handleOpen } = useDailyEntries();
  if (isDone) return null;
  if (!isDailyEntryOpen) return <Button className="mt-4 mx-auto rounded-lg" variant="logEvent" onClick={handleOpen}>Daily Entries</Button>
  const stepControlsProps = { isLastStep, isFirstStep, nextStep, prevStep, handleClose, handleSubmit, }

  return (
    <div className="bg-white/80 dark:bg-black/80 md:rounded-lg border-b md:border py-8 border-black dark:border-white grid gap-4 relative">
      <StepControls {...stepControlsProps} />
      <div className=" lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
