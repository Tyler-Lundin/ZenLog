import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Button } from "./ui/button";
import { IoCheckmark } from "react-icons/io5";


export default function StepControls({
  isFirstStep,
  isLastStep,
  handleClose,
  handleSubmit,
  nextStep,
  prevStep,
  className = "flex absolute w-full h-full top-0 left-0 items-center justify-between z-20 p-2 pointer-events-none"
}: {
  isFirstStep: boolean,
  isLastStep: boolean,
  handleClose: () => void,
  handleSubmit: () => void,
  nextStep: () => void,
  prevStep: () => void
  className?: string
}) {
  return (
    <div className={className}>
      <Button variant="invertedRed" size="xlSquare" className="rounded-full pointer-events-auto" onClick={isFirstStep ? handleClose : prevStep}>
        {isFirstStep ? <AiOutlineClose /> : <AiOutlineLeft />}
      </Button>

      <Button variant="invertedGreen" size="xlSquare" className="rounded-full pointer-events-auto" onClick={isLastStep ? handleSubmit : nextStep}>
        {isLastStep ? <IoCheckmark /> : <AiOutlineRight />}
      </Button>
    </div>
  )
}
