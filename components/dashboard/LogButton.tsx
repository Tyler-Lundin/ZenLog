'use client';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { toggleLogEventMenu } from "@/store/uiSlice";

export default function LogButton() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Button onClick={() => dispatch(toggleLogEventMenu())} className="fixed  hover:opacity-50 focus:opacity-50 bottom-4 right-8 backdrop-blur-sm aspect-square outline outline-gray-black rounded-full bg-green-500/70 border-none outline-black  grid  place-items-center text-white font-bold w-20 h-20">
      <AiOutlinePlus className="text-4xl" />
    </Button>
  )
}
