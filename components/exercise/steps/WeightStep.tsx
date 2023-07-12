
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


  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How much weight did you lift?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <Input variant="glass" size="8xlFit" className=" text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">lbs</span>
        <IoBarbellOutline className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
