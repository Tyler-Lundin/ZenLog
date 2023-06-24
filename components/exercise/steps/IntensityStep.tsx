import { Button } from "@/components/ui/button";
import { setNewIntensity } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function IntensityStep() {

  const { set } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { intensity } = set;
  const dispatch = useDispatch<AppDispatch>();


  const INTENSITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        How intense was the set?
      </label>
      <div className="relative border-b dark:border-white border-black grid justify-center mx-auto">
        <div className="grid grid-cols-5 lg:grid-cols-10 justify-center gap-2 mb-10">
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
