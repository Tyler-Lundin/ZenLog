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
  className = "fixed bottom-4 right-2 z-40",
  dispatchName = 'toggleEntrySelector'
}: {
  className?: string
  dispatchName?: keyof typeof dispatches
}) {
  const router = useRouter();


  return (
    <Button variant="green" onClick={() => router.push('/dashboard/exercise')} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold h-12`}>
      <div className="flex gap-2">
        <IoBarbell size="20" className="text-white dark:text-black" />
        <h2 className="uppercase font-bold text-white dark:text-black text-sm md:text-xl">Exercise</h2>
      </div>
    </Button>
  )
}
