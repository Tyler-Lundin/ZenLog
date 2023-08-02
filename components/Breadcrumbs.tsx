'use client'

import Link from "next/link"
import { Button } from "./ui/button"


export type Breadcrumb = {
  title: string,
  onClick: () => void
}

export default function Breadcrumbs({ breadcrumbs, currentStep }: { breadcrumbs: Breadcrumb[], currentStep: number }) {

  return (
    <div className="flex gap-1 items-center px-8">
      {breadcrumbs.map((breadcrumb, index) => {
        console.log({ breadcrumb, index, currentStep })
        const isCurrentStep = index === currentStep,
          isLastStep = index === breadcrumbs.length - 1,
          isPreviousStep = index === currentStep - 1;

        return (
          <div key={`breadcrumb-${index}`} className="flex ">
            <Button size="sm" className={`${isCurrentStep ? "-translate-y-1/2" : "opacity-60"} flex items-center gap-1 z-40 transition-all dark:bg-white dark:text-black text-black bg-black px-1 rounded-md`}>
              <h3 onClick={breadcrumb.onClick} className="text-sm font-bold">{breadcrumb.title}</h3>
            </Button>
            {!isLastStep && <small
              className={`${isCurrentStep && "-translate-y-1/3 rotate-45"} ${!isCurrentStep && isPreviousStep && "-translate-y-1/3 -rotate-45"} transition-all text-md font-thin dark:text-white text-black self-center ml-1`}>→</small>}
          </div>
        )
      })}
    </div>
  )
}
