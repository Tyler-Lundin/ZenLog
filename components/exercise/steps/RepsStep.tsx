import { AppDispatch, RootState } from "@/_store";
import { setNewReps } from "@/_store/slices/exerciseSlice";
import { Input } from "@/components/ui/input";
import { formatLeadingZero } from "@/lib/utils";
import { useState } from "react";
import { IoRepeat } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function RepsStep() {

  const { reps } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState<string>(reps.toString() ? '000' : reps.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let R = formatLeadingZero(e.target.value);
    R = R.length === 1 ? `00${R}` : R.length === 2 ? `0${R}` : R;
    if (R.length === 4) {
      R = R.slice(1)
    }
    setInputValue(R);
    dispatch(setNewReps(parseInt(R)))
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How many reps did you do?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <Input variant="glass" size="8xlFit" className=" text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">reps</span>
        <IoRepeat className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
