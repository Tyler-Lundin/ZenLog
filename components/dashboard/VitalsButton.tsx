'use client';
import { Button } from "../ui/button";
import { Activity } from "lucide-react";

export default function VitalsButton({
  className = "fixed bottom-4 left-4 z-40",
  onClick
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Button variant="blue" onClick={onClick} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold w-40 h-16`}>
      <div className="flex">
        <h2 className="uppercase font-bold">Log Vitals</h2>
        <Activity size="30" />
      </div>
    </Button>
  )
}
