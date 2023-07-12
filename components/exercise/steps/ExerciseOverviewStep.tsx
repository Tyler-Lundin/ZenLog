import { Badge } from "@/components/ui/badge";
import { formatRepsWeightAndUnit } from "@/lib/utils";
import { RootState } from "@/_store"
import { useState } from "react";
import { useSelector } from "react-redux"


export default function ExerciseOverviewStep() {

  const { exercise: { name, id }, weight, reps, intensity, toFailure, notes, tags } = useSelector((state: RootState) => state.exercise.newEntry);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

  const ONE_MINUTE = 1000 * 60;
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  }, ONE_MINUTE)

  return (
    <div className="grid dark:text-white items-center border w-full border-black/50 dark:border-white/50 p-8 rounded-xl relative">
      <div className="grid grid-cols-2 justify-between items-center w-full">
        {name && <h1 className="text-xl  font-bold uppercase ">{name}</h1>}
        {currentTime && <h2 className="text-md font-thin justify-self-end">{currentTime}</h2>}
      </div>
      <span className="my-1" />
      <hr className="my-1 border-zinc-600" />
      {tags.length > 0 ? (
        <div className="gap-1 flex flex-wrap my-2">
          {tags.map((tag: string, i: number) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </div>
      ) : <div className="text-sm opacity-80"> no tags </div>}
      <div className="grid items-center gap-2 ">
        <h2 className={`text-2xl font-thin  ${weight === 0 && reps === 0 && "dark:text-red-400"}`}>{formatRepsWeightAndUnit({ reps, weight })}</h2>
        {notes && <p className="text-md font-thin ">{notes}</p>}
        {intensity > 0 && <h2 className="text-2xl font-thin ">{intensity} RPE</h2>}
        {toFailure && <h2 className="text-2xl font-thin ">{toFailure && 'To Failure'}</h2>}
      </div>
    </div>
  )
}
