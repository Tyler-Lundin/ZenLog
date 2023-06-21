import { Badge } from "@/components/ui/badge";
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"


export default function ExerciseOverviewStep() {

  const { newExercise } = useSelector((state: RootState) => state.app.dashboard.exercise);
  const { exerciseName, sets } = newExercise;


  return (
    <div className="grid items-center">
      {exerciseName && <h1 className="text-5xl font-bold uppercase dark:text-white">{exerciseName}</h1>}
      {sets.map((set, i) => (
        <>
          {set.tags.length > 0 && (
            <div className="gap-1 flex">
              {set.tags.map((tag, i) => (
                <Badge variant={"default"} key={i}>{tag}</Badge>
              ))}
            </div>

          )}
          <div key={i} className="flex flex-col gap-2">
            <h2 className="text-2xl font-thin dark:text-white">{set.reps} x {set.weight} lbs</h2>
            {set.notes && <q className="text-2xl italic font-thin dark:text-white">{set.notes}</q>}
            <h2 className="text-2xl font-thin dark:text-white">{set.intensity} RPE</h2>
            <h2 className="text-2xl font-thin dark:text-white">{set.toFailure ? 'To Failure' : 'Not To Failure'}</h2>

          </div>
        </>
      ))}

    </div>
  )
}
