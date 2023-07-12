import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/_store";
import { useDispatch, useSelector } from "react-redux";
import { setNewToFailure } from "@/_store/slices/exerciseSlice";


export default function WeightStep() {

  const { toFailure } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (b: boolean) => dispatch(setNewToFailure(b));

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        Did you lift to failure?
      </label>
      <div className="relative border-b dark:border-white border-black justify-center flex flex-wrap gap-4 py-8">
        <div className="relative">
          <Button variant="glass" size="5xl" disabled={!toFailure} onClick={() => handleChange(false)}>No</Button>
          <span className={`${!toFailure && "animate-bounce"} text-3xl absolute bottom-0 left-2`}>🥱</span>
        </div>
        <div className="relative">
          <Button variant="glass" size="5xl" disabled={toFailure} onClick={() => handleChange(true)}>Yes</Button>
          <span className={`${toFailure && "animate-bounce"} text-3xl absolute bottom-0 left-2 `}>😎</span>
        </div>
      </div>
    </>
  )
}

