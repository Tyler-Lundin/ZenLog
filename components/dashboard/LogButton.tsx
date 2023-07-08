'use client';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { openLogExerciseForm, toggleLogEntryMenu } from "@/store/uiSlice";

export default function LogButton({
  className = "fixed hover:opacity-50 focus:opacity-50 bottom-4 right-4 z-40",
  dispatchName = 'toggleLogEntryMenu'
}: {
  className?: string
  dispatchName?: 'toggleLogEntryMenu' | 'openLogExerciseForm'
}) {
  const dispatch = useDispatch<AppDispatch>()

  const dispatches = {
    toggleLogEntryMenu,
    openLogExerciseForm,
  }


  return (
    <Button onClick={() => dispatch(dispatches[dispatchName]())} className={`${className} backdrop-blur-sm aspect-square outline outline-gray-black rounded-full bg-green-500/70 border-none outline-black  grid  place-items-center text-white font-bold w-20 h-20`}>
      <AiOutlinePlus className="text-4xl" />
    </Button>
  )
}
