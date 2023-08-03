import { Badge } from "@/components/ui/badge";
import { formatRepsWeightAndUnit } from "@/lib/utils";
import { RootState } from "@/_store"
import { useState } from "react";
import { useSelector } from "react-redux"
import ExerciseEntry from "../ExerciseEntry";


export default function ExerciseOverviewStep() {

  const { exerciseName, weight, reps, intensity, toFailure, notes, tags } = useSelector((state: RootState) => state.exercise.newEntry);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))

  const ONE_MINUTE = 1000 * 60;
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
  }, ONE_MINUTE)

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <div className="grid bg-white dark:bg-black dark:text-white items-center border w-full border-black/50 dark:border-white/50 p-3 md:p-4 lg:p-8 md:rounded-xl relative">
        <div className="grid grid-cols-10 justify-between items-center w-full">
          {exerciseName && <h1 className="text-xl col-span-8  font-bold uppercase  ">{exerciseName}</h1>}
          {currentTime && <h2 className="text-md col-span-2 dark:text-black text-white whitespace-nowrap bg-gray-300 px-1 rounded-lg border border-black dark:border-white font-bold justify-self-end">{currentTime}</h2>}
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
    </div>
  )

}

  // return (
  //   <div className="grid dark:text-white items-center border w-full border-black/50 dark:border-white/50 p-8 rounded-xl relative">
  //     <div className="grid grid-cols-2 justify-between items-center w-full">
  //       {name && <h1 className="text-xl  font-bold uppercase ">{name}</h1>}
  //       {currentTime && <h2 className="text-md font-thin justify-self-end">{currentTime}</h2>}
  //     </div>
  //     <span className="my-1" />
  //     <hr className="my-1 border-zinc-600" />
  //     {tags.length > 0 ? (
  //       <div className="gap-1 flex flex-wrap my-2">
  //         {tags.map((tag: string, i: number) => (
  //           <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
  //         ))}
  //       </div>
  //     ) : <div className="text-sm opacity-80"> no tags </div>}
  //     <div className="grid items-center gap-2 ">
  //       <h2 className={`text-2xl font-thin  ${weight === 0 && reps === 0 && "dark:text-red-400"}`}>{formatRepsWeightAndUnit({ reps, weight })}</h2>
  //       {notes && <p className="text-md font-thin ">{notes}</p>}
  //       {intensity > 0 && <h2 className="text-2xl font-thin ">{intensity} RPE</h2>}
  //       {toFailure && <h2 className="text-2xl font-thin ">{toFailure && 'To Failure'}</h2>}
  //     </div>
  //   </div>
  // )
