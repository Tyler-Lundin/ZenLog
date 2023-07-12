'use client';
import useDailyCheck from "@/hooks/useDailyCheck";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";
import StepControls from "../StepControls";


export default function DailyCheck() {
  const { isDone, currentStep, nextStep, prevStep, handleClose, handleSubmit, isLastStep, isFirstStep } = useDailyCheck();
  if (isDone) return null;

  const stepControlsProps = {
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep,
    handleClose,
    handleSubmit,
  }

  return (
    <div className="bg-white/80 dark:bg-black/80 md:rounded-lg border-b md:border py-8 border-black dark:border-white grid gap-4 relative">
      <StepControls {...stepControlsProps} />
      <div className=" lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
