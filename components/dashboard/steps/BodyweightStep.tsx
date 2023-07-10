import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatLeadingZero } from "@/lib/utils"
import { skipDailyStep, setDailyWeight } from "@/store/appSlice"
import { AppDispatch, RootState } from "@/store/store"
import { useState } from "react"
import { IoScaleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"


export default function BodyweightStep() {

  const { weight } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState(weight.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const W = formatLeadingZero(e.target.value);
    const newWeight = Number(W);
    if (newWeight > 999 || newWeight < -999) return
    dispatch(setDailyWeight(newWeight));
    setInputValue(W);
  }

  return (
    <>
      <label className="text-center text-black dark:text-white text-2xl font-thin">How much do you weigh today?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center text-black dark:text-white">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" max={999} type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 ">lbs</span>
        <IoScaleOutline className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>

  )
}
