
import { Input } from "@/components/ui/input";
import { formatLeadingZero } from "@/lib/utils";
import { setNewWeight } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { IoBarbellOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function WeightStep() {

  const { set } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { weight } = set
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState(weight.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const W = formatLeadingZero(e.target.value);
    const newWeight = Number(W);
    if (newWeight > 999 || newWeight < -999) return
    dispatch(setNewWeight(newWeight));
    setInputValue(W);
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How much weight did you lift?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">lbs</span>
        <IoBarbellOutline className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
