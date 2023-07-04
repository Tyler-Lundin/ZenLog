import { Input } from "@/components/ui/input";
import { formatLeadingZero } from "@/lib/utils";
import { setNewReps } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { IoRepeat } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function RepsStep() {

  const { set } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { reps } = set
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState(reps.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const R = formatLeadingZero(e.target.value);
    const newReps = Number(R);
    if (newReps > 999 || newReps < 0) return
    dispatch(setNewReps(newReps));
    setInputValue(R);
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How many reps did you do?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">reps</span>
        <IoRepeat className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
