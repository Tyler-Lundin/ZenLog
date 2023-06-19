import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoBed } from "react-icons/io5";


export default function SleepStep() {
  const [sleep, setSleep] = useState(0);

  const handleSetWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const hours = parseInt(e.target.value)
    if (hours > 24 || hours < 0) return
    setSleep(hours)
  }

  return (
    <>
      <label className="text-center text-2xl font-thin">How much sleep did you get?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" min={0} max={24} type="number" value={sleep} onChange={handleSetWeight} />
        <span className="text-2xl absolute right-0 bottom-0">hrs</span>
        <IoBed className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>
  )
}
