'use client';
import useDailyCheck from "@/hooks/useDailyCheck";


export default function DailyCheck() {
  const { currentStep, nextStep, prevStep } = useDailyCheck();

  return (
    <div className="bg-white/80 dark:bg-black/80 rounded-lg border py-8 border-black dark:border-white grid gap-4">
      <div className="px-8 lg:px-16 grid">
        {currentStep}
      </div>
    </div>
  )
}
