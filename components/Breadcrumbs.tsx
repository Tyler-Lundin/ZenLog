'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect } from "react"


export type Breadcrumb = {
  title: string,
  onClick: () => void
  isDone?: boolean
}

export default function Breadcrumbs({ breadcrumbs, currentStep, scrollRef }: { breadcrumbs: Breadcrumb[], currentStep: number, scrollRef: React.RefObject<HTMLDivElement> }) {
  useEffect(() => {
    if (scrollRef.current) {
      const targetElement = scrollRef.current.children[0].children[currentStep] as HTMLElement;
      if (targetElement) {
        const leftPosition = targetElement.offsetLeft - (scrollRef.current.offsetWidth / 2) + (targetElement.offsetWidth / 2);
        scrollRef.current.scrollTo({ left: leftPosition, behavior: "smooth" });
      }
    }
  }, [currentStep, scrollRef]);

  return (
    <div className="flex gap-1 items-center px-8 justify-center h-fit w-full">
      {breadcrumbs.map((breadcrumb, index) => {
        const isCurrentStep = index === currentStep,
          isLastStep = index === breadcrumbs.length - 1,
          isPreviousStep = index === currentStep - 1;
        return (
          <div key={`breadcrumb-${index}`} className="flex z-10">
            <Button onClick={breadcrumb.onClick} className={`${isCurrentStep ? "-translate-y-1/3" : "opacity-60"} flex items-center gap-1 z-40 transition-all dark:bg-black dark:text-white text-black bg-white px-1 rounded-md text-xs whitespace-nowrap h-min py-1`}>
              <small className="font-bold text-lg">{breadcrumb.title}</small>
            </Button>
            {!isLastStep && <small key={`breadcrumb-arrow-${index}`} className={`${isCurrentStep && "-translate-y-1/4 rotate-45"} ${!isCurrentStep && isPreviousStep && "-translate-y-1/4 -rotate-45"} transition-all text-md font-thin text-black dark:text-white self-center ml-1`}>→</small>}
          </div>
        )
      })}
    </div>
  )
}
