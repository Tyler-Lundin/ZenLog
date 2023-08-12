import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/_store";
import { useDispatch, useSelector } from "react-redux";
import { setNewToFailure } from "@/_store/slices/exerciseSlice";


export default function WeightStep() {

  const { toFailure } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (b: boolean) => dispatch(setNewToFailure(b));

  const isYes = toFailure === true;
  const isNo = toFailure === false && toFailure !== undefined;

  const handleClear = () => dispatch(setNewToFailure(undefined));

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <label className="text-center text-md sm:text-2xl font-thin dark:text-white my-4">
        Did you lift to failure?
      </label>
      <div className="relative place-content-center grid gap-2 pb-12">
        <div className="relative">
          <Button className={"disabled:opacity-100 dark:disabled:bg-white dark:disabled:text-black disabled:text-white disabled:bg-black opacity-50 w-full"} variant="glass" size="2xl" disabled={isYes} onClick={() => handleChange(true)}>Yes</Button>
        </div>
        <div className="relative">
          <Button className={"disabled:opacity-100 dark:disabled:bg-white dark:disabled:text-black disabled:text-white disabled:bg-black opacity-50 w-full"} variant="glass" size="2xl" disabled={isNo} onClick={() => handleChange(false)}>No</Button>
        </div>
        <Button variant="glass" size="xl" className="absolute bottom-0 left-1/2 -translate-x-1/2" onClick={handleClear}>Clear</Button>
      </div>
    </div>
  )
}

