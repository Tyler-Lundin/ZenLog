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
    <Button variant="blue" onClick={onClick} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold  h-12`}>
      <div className="flex gap-2 place-items-center">
        <h2 className="uppercase font-bold dark:text-black text-white text-sm md:text-xl">Vitals</h2>
        <Activity size="20" className="dark:text-black text-white" />
      </div>
    </Button>
  )
}
