import { Badge } from "@/components/ui/badge";
import { formatRepsWeightAndUnit } from "@/lib/utils";
import { RootState } from "@/store/store"
import { useState } from "react";
import { useSelector } from "react-redux"


export default function ExerciseOverviewStep() {

  const { newExercise } = useSelector((state: RootState) => state.app.dashboard.exercise);
  const { exerciseName, set } = newExercise;
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

  const ONE_MINUTE = 1000 * 60;
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  }, ONE_MINUTE)


  return (
    <div className="grid items-center border w-72 border-black/50 dark:border-white/50 p-8 rounded-xl relative">
      {exerciseName && <h1 className="text-xl absolute left-4 top-4 font-bold uppercase dark:text-white">{exerciseName}</h1>}
      {currentTime && <h2 className="text-md font-thin dark:text-white absolute top-4 right-4">{currentTime}</h2>}
      <span className="my-1" />
      <hr className="my-1 border-zinc-600" />
      {set.tags.length > 0 && (
        <div className="gap-1 flex flex-wrap my-2">
          {set.tags.map((tag: string, i: number) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2 ">
        <h2 className="text-2xl font-thin dark:text-white">{formatRepsWeightAndUnit(set)}</h2>
        {set.notes && <p className="text-md font-thin dark:text-white">{set.notes}</p>}
        <h2 className="text-2xl font-thin dark:text-white">{set.intensity} RPE</h2>
        <h2 className="text-2xl font-thin dark:text-white">{set.toFailure ? 'To Failure' : 'Not To Failure'}</h2>

      </div>
    </div>
  )
}
