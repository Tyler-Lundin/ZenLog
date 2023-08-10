'use client';
import { Button } from "../ui/button";
import { Activity } from "lucide-react";

export default function VitalsButton({
  className = "fixed bottom-4 left-2 z-40",
  onClick
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Button variant="blue" onClick={onClick} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold  h-12 group`}>
      <div className="flex gap-2 place-items-center">
        <h2 className="hidden md:inline uppercase font-bold dark:text-black text-white text-sm md:text-xl group-hover:text-blue-500">Vitals</h2>
        <Activity size="20" className="dark:text-black text-white group-hover:text-blue-500" />
      </div>
    </Button>
  )
}
