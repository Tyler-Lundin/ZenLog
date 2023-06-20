import { Button } from "@/components/ui/button";
import { addExerciseEntry, setNewExerciseName, setNewExerciseSets } from "@/store/appSlice";
import { RootState } from "@/store/store";
import { setExerciseError, toggleLogExerciseForm } from "@/store/uiSlice";
import { useDispatch, useSelector } from "react-redux";


export default function LogExerciseStep() {

  const dispatch = useDispatch();
  const { id: dateId } = useSelector((state: RootState) => state.app.date);
  const { newExercise } = useSelector((state: RootState) => state.app.dashboard.exercise);
  const { exerciseName, sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise);
  const setsLength = sets.length;
  const isDisabled = !exerciseName || setsLength === 0;

  const handleSubmit = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/log/exercise', {
        method: 'POST',
        body: JSON.stringify({
          newExercise,
          dateId,
        }),
      }).then((res) => res.json());

      if (res.error) return dispatch(setExerciseError(res.error))
      if (res.success) {
        dispatch(setNewExerciseName(''));
        dispatch(setNewExerciseSets([]));
        dispatch(addExerciseEntry(res.data))
        dispatch(toggleLogExerciseForm())
      }


    } catch (err: any) {
      dispatch(setExerciseError(err.message || 'Something went wrong logging new exercise!'))
    }

  };

  return (
    <div className="z-40 bg-white/80 backdrop-blur-sm dark:bg-black/80 p-2 w-full grid place-content-center h-16">
      <Button disabled={isDisabled} onClick={handleSubmit} variant="default" size="xl" >Log Exercise</Button>
    </div>
  )
}
