import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/_store";
import { useDispatch, useSelector } from "react-redux";
import { setNewToFailure } from "@/_store/slices/exerciseSlice";


export default function WeightStep() {

  const { toFailure } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (b: boolean) => dispatch(setNewToFailure(b));

  return (
    <div className="w-screen h-screen bg-white dark:bg-black fixed top-0 left-0 z-10 pointer-events-none grid place-content-center">
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        Did you lift to failure?
      </label>
      <div className="relative place-content-center grid gap-4 py-8 ">
        <div className="relative">
          <Button className={"disabled:opacity-100 opacity-50 w-full"} variant="glass" size="5xl" disabled={toFailure} onClick={() => handleChange(true)}>Yes</Button>
        </div>
        <div className="relative">
          <Button className={"disabled:opacity-100 opacity-50 w-full"} variant="glass" size="5xl" disabled={!toFailure} onClick={() => handleChange(false)}>No</Button>
        </div>
      </div>
    </div>
  )
}

