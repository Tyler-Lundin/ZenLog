'use client';
import useDailyCheck from "@/hooks/useDailyCheck";
import { Button } from "../ui/button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


export default function DailyCheck() {
  const { currentStep, nextStep, prevStep, isLastStep, isFirstStep } = useDailyCheck();

  return (
    <div className="bg-white/80 dark:bg-black/80 md:rounded-lg border-b md:border py-8 border-black dark:border-white grid gap-4 relative">
      <div className="flex absolute w-full h-full top-0 left-0 items-center justify-between z-20 p-2 pointer-events-none">
        <Button disabled={isFirstStep} variant="glass" onClick={prevStep} size="mdSquare" className="rounded-full pointer-events-auto" ><AiOutlineLeft /></Button>
        <Button disabled={isLastStep} variant="glass" size="mdSquare" className="rounded-full pointer-events-auto" onClick={nextStep} ><AiOutlineRight /></Button>
      </div>
      <div className=" lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
