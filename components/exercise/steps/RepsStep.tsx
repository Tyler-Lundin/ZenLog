import { AppDispatch, RootState } from "@/_store";
import { setNewReps } from "@/_store/slices/exerciseSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatLeadingZero } from "@/lib/utils";
import { useState } from "react";
import { IoRepeat } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function RepsStep() {

  const { reps } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const startValue = reps ? reps.toString() : "000";
  const [inputValue, setInputValue] = useState<string>(startValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let R = formatLeadingZero(e.target.value);
    R = R.length === 1 ? `00${R}` : R.length === 2 ? `0${R}` : R;
    if (R.length === 4) {
      R = R.slice(1)
    }
    setInputValue(R);
    dispatch(setNewReps(parseInt(R)))
  }

  const handleClear = () => {
    setInputValue("000");
    dispatch(setNewReps(0))
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <label className="text-center text-md sm:text-2xl font-thin dark:text-white my-4">
        How many reps did you do?
      </label>
      <div className="relative mx-auto grid justify-center pb-8">
        <Input variant="glass" size="8xlFit" className=" text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">reps</span>
        <IoRepeat className="absolute left-0 bottom-1 text-2xl dark:text-white" />
        <Button variant="glass" size="xl" className="absolute bottom-0 left-1/2 -translate-x-1/2 " onClick={handleClear}>Clear</Button>
      </div>
    </div>
  )
}
