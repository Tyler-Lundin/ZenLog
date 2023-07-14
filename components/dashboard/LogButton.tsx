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
  className = "fixed bottom-4 right-4 z-40",
  dispatchName = 'toggleEntrySelector'
}: {
  className?: string
  dispatchName?: keyof typeof dispatches
}) {
  const dispatch = useDispatch<AppDispatch>()


  return (
    <Button variant="green" onClick={() => dispatch(dispatches[dispatchName]())} className={`${className} aspect-square rounded-full border-none outline-black  grid  place-items-center font-bold w-12 h-12`}>
      <AiOutlinePlus className="text-xl " />
    </Button>
  )
}
