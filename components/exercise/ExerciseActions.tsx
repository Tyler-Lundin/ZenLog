'use client';
import { Button } from "@/components/ui/button";
import { BsGearFill } from "react-icons/bs";
import { BiPlus, BiStats } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openLogExerciseForm } from "@/store/uiSlice";
import { SheetTrigger } from "@/components/ui/sheet";
import FilterExerciseActions from "./FilterExerciseActions";


export default function ExerciseActions() {

  const dispatch = useDispatch()

  return (
    <ul className="flex gap-4 w-full bg-white/80 dark:bg-black/80 p-2 rounded-md border border-black dark:border-white">
      <SheetTrigger asChild>
        <Button size="mdSquare" className={`transition-all relative`} variant="logEvent" onClick={() => dispatch(openLogExerciseForm())}>
          <BiPlus />
        </Button>
      </SheetTrigger>
      <Button size="mdSquare" variant="default" onClick={() => console.log('clack')}> <BiStats /> </Button>
      <Button size="mdSquare" variant="default" onClick={() => console.log('click')}> <BsGearFill /> </Button>
      <FilterExerciseActions />
    </ul>
  )
}
