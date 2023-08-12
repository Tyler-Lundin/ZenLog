import { Badge } from "@/components/ui/badge";
import { formatRepsWeightAndUnit } from "@/lib/utils";
import { RootState } from "@/_store"
import { useState } from "react";
import { useSelector } from "react-redux"


export default function ExerciseOverviewStep() {

  const { exerciseName, weight, reps, intensity, toFailure, notes, tags } = useSelector((state: RootState) => state.exercise.newEntry);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

  const ONE_MINUTE = 1000 * 60;
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  }, ONE_MINUTE)

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <div className="grid bg-white dark:bg-black dark:text-white items-center border w-full border-black/50 dark:border-white/50 p-3 md:p-4 lg:p-8 relative">
        <div className="grid grid-cols-10 justify-between items-center w-full">
          {exerciseName ? <h1 className="text-xl col-span-8  font-bold uppercase  ">{exerciseName}</h1> : <h1 className="text-sm col-span-8  font-bold uppercase text-red-400">No Exercise Selected</h1>}
          {currentTime && <h2 className="text-md col-span-2 dark:text-black text-white whitespace-nowrap dark:bg-gray-300 bg-black px-1 rounded-md border border-black dark:border-white  justify-self-end">{currentTime.split(' ')[0]} <span className="text-sm">{currentTime.split(' ')[1]}</span></h2>}
        </div>
        <span className="my-1" />
        {tags.length > 0 && (
          <div className="gap-1 flex flex-wrap my-2">
            {tags.map((tag: string, i: number) => (
              <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
            ))}
          </div>
        )}
        <div className="grid items-center gap-2 ">
          <h2 className={`text-xl font-thin  ${weight === 0 || weight === undefined && reps === 0 || reps === undefined && "dark:text-red-400"}`}>{formatRepsWeightAndUnit({ reps, weight })}</h2>
          {notes && <p className="text-md font-thin ">{notes}</p>}
          {intensity && intensity > 0 && <h2 className="text-2xl font-thin ">{intensity} RPE</h2>}
          {toFailure !== undefined && <h2 className="text-2xl font-thin ">{toFailure ? 'To Failure' : 'Not To Failure'}</h2>}
        </div>
      </div>
    </div>
  )
}

