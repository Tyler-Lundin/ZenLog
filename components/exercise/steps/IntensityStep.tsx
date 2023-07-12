import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/_store";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setNewIntensity } from "@/_store/slices/exerciseSlice";

const INTENSITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function IntensityStep() {

  const { intensity } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();


  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How intense was the set?
      </label>
      <div className="relative border-b dark:border-white border-black grid justify-center mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5  justify-center gap-4 mb-10">
          {INTENSITY.map((rpe) => (
            <Button key={rpe} variant="default" disabled={intensity === rpe} size="xlSquare" className="p-2" onClick={() => dispatch(setNewIntensity(rpe))}>{rpe}</Button>
          ))}
        </div>
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">RPE</span>
        <IoSpeedometerOutline className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}
