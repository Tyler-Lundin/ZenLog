'use client';
import { Button } from "@/components/ui/button";
import { BsGearFill } from "react-icons/bs";
import { BiPlus, BiStats } from "react-icons/bi";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleLogExerciseForm } from "@/store/uiSlice";


export default function ExerciseActions() {

  const dispatch = useDispatch()
  const { isLogExerciseFormOpen } = useSelector((state: RootState) => state.ui.dashboard.exercise)

  return (
    <ul className="flex gap-4 w-full">
      <Button size="mdSquare" className={`transition-all relative`} variant="logEvent" onClick={() => dispatch(toggleLogExerciseForm())}>
        <BiPlus />
        <span className={`absolute ${isLogExerciseFormOpen ? "bottom-0 opacity-100" : " bottom-1/2 opacity-0"} transition-all left-1/2 transform text-sm -translate-x-1/2 translate-y-full`}>
          <GoTriangleDown className="text-green-500" />
        </span>
      </Button>
      <Button size="mdSquare" variant="default" onClick={() => console.log('clack')}> <BiStats /> </Button>
      <Button size="mdSquare" variant="default" onClick={() => console.log('click')}> <BsGearFill /> </Button>
    </ul>
  )
}
