import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Button } from "./ui/button";
import { IoCheckmark } from "react-icons/io5";


export default function StepControls({
  isFirstStep,
  isLastStep,
  handleClose,
  nextStep,
  prevStep,
  className = "flex absolute w-full h-full top-0 left-0 items-center justify-between z-20 p-2 pointer-events-none",
  children,
  type = "default"
}: {
  isFirstStep: boolean,
  isLastStep: boolean,
  handleClose: () => void,
  nextStep: () => void,
  prevStep: () => void
  className?: string
  children?: React.ReactNode
  type?: "default" | "done"
}) {

  if (type === "done")
    return (
      <div className={className}>
        <Button variant={isFirstStep ? "glassRed" : "glass"} size="xlSquare" className="rounded-full pointer-events-auto" onClick={isFirstStep ? handleClose : prevStep}>
          {isFirstStep ? <AiOutlineClose /> : <AiOutlineLeft />}
        </Button>
        {children}
        <Button variant={isLastStep ? "glassGreen" : "glass"} size="xlSquare" className="rounded-full pointer-events-auto" onClick={nextStep}>
          {isLastStep ? <IoCheckmark /> : <AiOutlineRight />}
        </Button>
      </div>
    )

  return (
    <div className={className}>
      <Button variant={isFirstStep ? "glassRed" : "glass"} size="xlSquare" className="rounded-full pointer-events-auto" onClick={isFirstStep ? handleClose : prevStep}>
        {isFirstStep ? <AiOutlineClose /> : <AiOutlineLeft />}
      </Button>
      {children}
      <Button disabled={isLastStep} variant={"glass"} size="xlSquare" className="rounded-full pointer-events-auto" onClick={nextStep}>
        <AiOutlineRight />
      </Button>
    </div>
  )
}
