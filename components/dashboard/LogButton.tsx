'use client';
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import { AppDispatch } from "@/_store";
import { useDispatch } from "react-redux";
import { toggleEntrySelector } from "@/_store/slices/uiSlice";
import { useRouter } from "next/navigation";
import { GiWeight } from "react-icons/gi";
import { IoBarbell } from "react-icons/io5";

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
  const router = useRouter();


  return (
    <Button variant="green" onClick={() => router.push('/dashboard/exercise')} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold w-40 h-16`}>
      <div className="flex">
        <IoBarbell size="30" />
        <h2 className="uppercase font-bold">Exercise</h2>
      </div>
    </Button>
  )
}
