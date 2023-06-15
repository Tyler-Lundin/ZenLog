'use client';
import { Button } from "@/components/ui/button";
import { BsGearFill } from "react-icons/bs";
import { BiPlus, BiStats } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toggleLogExerciseForm } from "@/store/uiSlice";
import { SheetTrigger } from "@/components/ui/sheet";


export default function ExerciseActions() {

  const dispatch = useDispatch()

  return (
    <ul className="flex gap-4 w-full">
      <SheetTrigger asChild>
        <Button size="mdSquare" className={`transition-all relative`} variant="logEvent" onClick={() => dispatch(toggleLogExerciseForm())}>
          <BiPlus />
        </Button>
      </SheetTrigger>
      <Button size="mdSquare" variant="default" onClick={() => console.log('clack')}> <BiStats /> </Button>
      <Button size="mdSquare" variant="default" onClick={() => console.log('click')}> <BsGearFill /> </Button>
    </ul>
  )
}
