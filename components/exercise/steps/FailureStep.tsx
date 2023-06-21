import { Button } from "@/components/ui/button";
import { setNewToFailure, setNewWeight } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { MdIncompleteCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";


export default function WeightStep() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const dispatch = useDispatch<AppDispatch>();

  const setIndex = sets.length - 1
  const { toFailure } = sets[setIndex]

  const handleChange = (b: boolean) => {
    dispatch(setNewToFailure({ setIndex, toFailure: b }));
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        Did you lift to failure?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto justify-center">
        <div className="grid w-60 justify-items-center grid-cols-2 mb-10">
          <Button size="lgSquare" disabled={!toFailure} className="p-2" onClick={() => handleChange(false)}>No</Button>
          <Button size="lgSquare" disabled={toFailure} onClick={() => handleChange(true)}>Yes</Button>
        </div>
        <span className={`${toFailure && "animate-bounce"} text-2xl absolute right-0 bottom-0`}>😎</span>
        <span className={`${!toFailure && "animate-bounce"} text-2xl absolute left-0 bottom-0`}>🥱</span>
      </div>
    </>
  )
}




// {
//   title: 'To Failure?',
//     setIndex: 2,
//       content: (
//         <div className="flex gap-2">
//           <Label htmlFor={`set-${setIndex}-to-failure`}>To Failure</Label>
//           <Button variant="default" size="lgSquare" className="p-2" onClick={() => handleBooleanChange(setIndex, 'toFailure', { target: { checked: true } } as any)}>Yes</Button>
//           <Button variant="default" size="lgSquare" className="p-2" onClick={() => handleBooleanChange(setIndex, 'toFailure', { target: { checked: false } } as any)}>No</Button>
//         </div>
//       )
// }

