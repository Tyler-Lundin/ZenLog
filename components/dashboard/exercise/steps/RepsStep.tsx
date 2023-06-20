import { Input } from "@/components/ui/input";
import { setNewReps } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IoRepeat } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function RepsStep() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const dispatch = useDispatch<AppDispatch>();

  const setIndex = sets.length - 1
  const { reps } = sets[setIndex]
  console.log({ reps, sets, setIndex });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReps = parseInt(e.target.value);
    if (newReps > 999 || newReps < 0) return
    dispatch(setNewReps({ setIndex, reps: newReps }));
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How many reps did you do?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" type="number" value={reps} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">reps</span>
        <IoRepeat className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
