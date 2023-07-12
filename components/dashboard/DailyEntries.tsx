'use client';
import useDailyCheck from "@/hooks/useDailyCheck";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";


export default function DailyCheck() {
  const { isDone, currentStep, nextStep, prevStep, handleClose, handleSubmit, isLastStep, isFirstStep } = useDailyCheck();
  if (isDone) return null;

  return (
    <div className="bg-white/80 dark:bg-black/80 md:rounded-lg border-b md:border py-8 border-black dark:border-white grid gap-4 relative">
      <div className="flex absolute w-full h-full top-0 left-0 items-center justify-between z-20 p-2 pointer-events-none">
        <Button variant="glass" size="mdSquare" className="rounded-full pointer-events-auto" onClick={isFirstStep ? handleClose : prevStep}>
          {isFirstStep ? <AiOutlineClose /> : <AiOutlineLeft />}
        </Button>

        <Button variant="glass" size="mdSquare" className="rounded-full pointer-events-auto" onClick={isLastStep ? handleSubmit : nextStep}>
          {isLastStep ? <IoCheckmark /> : <AiOutlineRight />}
        </Button>
      </div>
      <div className=" lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
