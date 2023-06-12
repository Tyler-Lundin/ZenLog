'use client';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { toggleLogEventMenu } from "@/store/uiSlice";

export default function LogButton() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Button onClick={() => dispatch(toggleLogEventMenu())} className="aspect-square outline outline-gray-black rounded-full bg-green-500/70 backdrop-blur-md grid  place-items-center text-white font-bold w-14 h-14">
      <AiOutlinePlus className="text-3xl" />
    </Button>
  )
}
