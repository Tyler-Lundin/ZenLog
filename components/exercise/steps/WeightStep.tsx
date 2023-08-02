
import { Input } from "@/components/ui/input";
import { formatLeadingZero } from "@/lib/utils";
import { AppDispatch, RootState } from "@/_store";
import { useState } from "react";
import { IoBarbellOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setNewWeight } from "@/_store/slices/exerciseSlice";

export default function WeightStep() {
  const { weight } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>(weight.toString() ? '000' : weight.toString())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let W = formatLeadingZero(e.target.value);
    W = W.length === 1 ? `00${W}` : W.length === 2 ? `0${W}` : W;
    if (W.length === 4) {
      W = W.slice(1)
    }
    setInputValue(W);
    dispatch(setNewWeight(parseInt(W)))
  }

  // "8xlFit": "h-min px-4 rounded-md text-6xl md:text-8xl py-0",

  return (
    <div className="w-screen h-screen bg-white dark:bg-black fixed top-0 left-0 z-10 grid place-content-center">
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How much weight did you lift?
      </label>
      <div className="relative mx-auto grid justify-center self-center">
        <span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-6xl md:text-8xl text-gray-400 dark:text-gray-600 pointer-events-none"><IoBarbellOutline /></span>
        <Input variant="glass" size="8xlFit" className="relative text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-6xl md:text-8xl text-gray-400 dark:text-gray-600 pointer-events-none">lbs</span>
      </div>
    </div>
  )
}
