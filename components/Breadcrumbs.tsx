'use client'

import Link from "next/link"
import { Button } from "./ui/button"


export type Breadcrumb = {
  title: string,
  onClick: () => void
}

export default function Breadcrumbs({ breadcrumbs, currentStep }: { breadcrumbs: Breadcrumb[], currentStep: number }) {

  return (
    <div className="flex gap-1 items-center px-8 justify-center h-screen">
      {breadcrumbs.map((breadcrumb, index) => {
        const isCurrentStep = index === currentStep,
          isLastStep = index === breadcrumbs.length - 1,
          isPreviousStep = index === currentStep - 1;

        return (
          <div key={`breadcrumb-${index}`} className="flex z-10">
            <Button onClick={breadcrumb.onClick} className={`${isCurrentStep ? "-translate-y-1/2" : "opacity-60"} flex items-center gap-1 z-40 transition-all dark:bg-white dark:text-black text-white bg-black px-1 rounded-md text-xs whitespace-nowrap h-min py-1`}>
              <small >{breadcrumb.title}</small>
            </Button>
            {!isLastStep && <small key={`breadcrumb-arrow-${index}`} className={`${isCurrentStep && "-translate-y-1/3 rotate-45"} ${!isCurrentStep && isPreviousStep && "-translate-y-1/3 -rotate-45"} transition-all text-md font-thin text-black dark:text-white self-center ml-1`}>→</small>}
          </div>
        )
      })}
    </div>
  )
}
