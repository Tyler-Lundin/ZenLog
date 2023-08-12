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
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <label className="text-center text-md sm:text-2xl font-thin dark:text-white mb-4">
        How intense was the set? (RPE)
      </label>
      <div className="relative border-black grid justify-center mx-auto">
        <div className="grid grid-cols-5   justify-center gap-4 mb-10">
          {INTENSITY.map((rpe) => (
            <Button key={rpe} variant="glass" disabled={intensity === rpe} size="xlSquare" className="p-2 disabled:opacity-100 disabled:bg-blue-400" onClick={() => dispatch(setNewIntensity(rpe))}>{rpe}</Button>
          ))}
        </div>
        <Button variant="glass" size="xl" className="absolute bottom-0 left-1/2 -translate-x-1/2 " onClick={() => dispatch(setNewIntensity(undefined))}>Clear</Button>
      </div>
    </div>
  )
}
