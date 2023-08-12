import { ExerciseEntry as IExerciseEntry, } from "@prisma/client"
import { Badge } from "../ui/badge"
import { dateToTime, formatRepsWeightAndUnit } from "@/lib/utils"
import { useState } from "react";



export default function ExerciseEntry({ exercise }: { exercise: IExerciseEntry }) {
  const exerciseName = exercise?.exerciseName;
  const createdAt = dateToTime(exercise?.createdAt as unknown as string);
  const weight = exercise?.set?.weight;
  const reps = exercise?.set?.reps;
  const intensity = exercise?.set?.intensity;
  const toFailure = exercise?.set?.toFailure;
  const notes = exercise?.set?.notes;
  const tags = exercise?.set?.tags;


  return (
    <div className="grid bg-white dark:bg-black dark:text-white items-center border w-full border-black/50 dark:border-white/50 p-3 md:p-4 lg:p-8 relative">
      <div className="grid grid-cols-10 justify-between items-center w-full">
        {exerciseName && <h1 className="text-xl col-span-8  font-bold uppercase  ">{exerciseName}</h1>}
        {createdAt && <h2 className="text-md col-span-2 dark:text-black text-white whitespace-nowrap dark:bg-gray-300 bg-black px-1 rounded-md border border-black dark:border-white font-bold justify-self-end">{createdAt}</h2>}
      </div>
      {tags.length > 0 && (
        <div className="gap-1 flex flex-wrap my-2">
          {tags.map((tag: string, i: number) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </div>
      )}
      <div className="grid items-center gap-2 ">
        <h2 className={`text-2xl font-thin  ${weight === 0 && reps === 0 && "dark:text-red-400"}`}>{formatRepsWeightAndUnit(exercise.set)}</h2>
        {notes && <p className="text-md font-thin ">{notes}</p>}
        {intensity && intensity > 0 && <h2 className="text-2xl font-thin ">{intensity} RPE</h2>}
        {toFailure !== undefined && toFailure && <h2 className="text-2xl font-thin ">To Failure</h2>}
      </div>
    </div>
  )
}
