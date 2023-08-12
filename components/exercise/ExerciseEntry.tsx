import { ExerciseEntry as IExerciseEntry, } from "@prisma/client"
import { Badge } from "../ui/badge"
import { dateToTime, formatRepsWeightAndUnit } from "@/lib/utils"

export default function ExerciseEntry({ exercise, isChildInSet, isParentInSet, isLastChildInSet }: { exercise: IExerciseEntry, isChildInSet?: boolean, isParentInSet?: boolean, isLastChildInSet?: boolean }) {
  const exerciseName = exercise?.exerciseName;
  const createdAt = dateToTime(exercise?.createdAt as unknown as string);
  const weight = exercise?.set?.weight;
  const reps = exercise?.set?.reps;
  const intensity = exercise?.set?.intensity;
  const toFailure = exercise?.set?.toFailure;
  const notes = exercise?.set?.notes;
  const tags = exercise?.set?.tags;


  if (isChildInSet) return (
    <div className="grid dark:text-white items-center border-x w-full border-black/50 dark:border-white/50 px-3 md:px-4 lg:px-8 relative pt-2">
      <div className="grid items-center gap-2 relative">
        <h2 className={`text-lg sm:text-2xl font-thin  ${weight === 0 && reps === 0 && "dark:text-red-400"}`}>{formatRepsWeightAndUnit(exercise.set)}</h2>
        <div className="flex gap-8">
          {notes && <p className="text-md font-thin ">{notes}</p>}
          {intensity && intensity > 0 && <small className="text-sm font-thin ">{intensity} RPE</small>}
          {toFailure !== undefined && toFailure && <small className="text-sm font-thin ">To Failure</small>}
        </div>
        {createdAt && <h2 className="absolute top-1/2 -translate-y-1/2 text-md col-span-2 dark:text-white text-white whitespace-nowrap px-1 rounded-md font-thin  justify-self-end">{createdAt}</h2>}
      </div>
      {!isLastChildInSet && <hr className="w-full border-black/50 dark:border-white/50" />}
    </div>
  )


  return (
    <div className={`${isParentInSet && 'border-b'} grid bg-white dark:bg-black dark:text-white items-center border-x border-t w-full border-black/50 dark:border-white/50 px-3 md:px-4 lg:px-8 relative pt-4`}>
      {exerciseName && <h1 className="text-xl  font-bold uppercase  ">{exerciseName}</h1>}
      {tags.length > 0 && (
        <div className="gap-1 flex flex-wrap my-2">
          {tags.map((tag: string, i: number) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </div>
      )}
      <div className="grid items-center gap-2 relative">
        <h2 className={`text-lg sm:text-2xl font-thin  ${weight === 0 && reps === 0 && "dark:text-red-400"}`}>{formatRepsWeightAndUnit(exercise.set)}</h2>
        <div className="flex">
          {notes && <p className="text-md font-thin ">{notes}</p>}
          {intensity && intensity > 0 && <small className="text-sm font-thin ">{intensity} RPE</small>}
          {toFailure !== undefined && toFailure && <small className="text-sm font-thin ">To Failure</small>}
        </div>
        {createdAt && <h2 className="absolute top-1/2 -translate-y-1/2 text-md col-span-2 dark:text-white text-white whitespace-nowrap px-1 rounded-md font-thin  justify-self-end">{createdAt}</h2>}
      </div>
      {!isLastChildInSet && !isParentInSet && <hr className="w-full border-black/50 dark:border-white/50" />}
    </div>
  )


}
