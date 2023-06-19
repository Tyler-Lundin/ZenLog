import { Input } from "@/components/ui/input"
import { useState } from "react"
import { IoScaleOutline } from "react-icons/io5"


export default function BodyweightStep() {

  const [weight, setWeight] = useState(0)

  const handleSetWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const weight = parseInt(e.target.value)
    if (weight > 999 || weight < 0) return
    setWeight(weight)
  }

  return (
    <>
      <label className="text-center text-2xl font-thin">How much do you weigh today?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" max={999} type="number" value={weight} onChange={handleSetWeight} />
        <span className="text-2xl absolute right-0 bottom-0">lbs</span>
        <IoScaleOutline className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>

  )
}
