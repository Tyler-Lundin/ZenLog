'use client';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { AppDispatch } from "@/_store";
import { useDispatch } from "react-redux";
import { toggleEntrySelector } from "@/_store/slices/uiSlice";

const dispatches = {
  toggleEntrySelector
}

export default function LogButton({
  className = "fixed hover:bg-green-300 hover:dark:bg-green-300 focus:opacity-50 bottom-4 right-4 z-40",
  dispatchName = 'toggleEntrySelector'
}: {
  className?: string
  dispatchName?: keyof typeof dispatches
}) {
  const dispatch = useDispatch<AppDispatch>()


  return (
    <Button onClick={() => dispatch(dispatches[dispatchName]())} className={`${className} backdrop-blur-sm aspect-square outline outline-gray-black rounded-full bg-green-500/70 border-none outline-black  grid  place-items-center text-white font-bold w-16 h-16`}>
      <AiOutlinePlus className="text-4xl text-white" />
    </Button>
  )
}
