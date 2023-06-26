import { ExerciseSet, ExerciseEntry as IExerciseEntry, } from "@prisma/client"
import { Badge } from "../ui/badge"


const dateToTime = (date: string) => {
  const D = new Date(date)
  return D.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const getVolume = (set: ExerciseSet) => {
  if (set?.weight >= 0 && set?.reps >= 0) return set.weight * set.reps;
  return 0;
}

export default function ExerciseEntry({ exercise }: { exercise: IExerciseEntry }) {
  const weight = exercise?.set?.weight;
  const reps = exercise?.set?.reps;
  const intensity = exercise?.set?.intensity;
  const toFailure = exercise?.set?.toFailure;
  const notes = exercise?.set?.notes;
  const tags = exercise?.set?.tags;

  return (
    <li key={exercise.id} className="dark:bg-black bg-zinc-200 text-black dark:text-white rounded-md p-4 w-full border border-black dark:border-white">
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{exercise.exerciseName}</h3>
          <p className="text-sm font-semibold">{dateToTime(exercise.createdAt as unknown as string)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {weight > 0 && reps > 0 && <h3 className="text-sm font-semibold">Total Volume: {getVolume(exercise.set)} lbs</h3>}
        </div>
      </div>

      <hr className="my-2 border-zinc-600" />

      <div className="grid grid-cols-2 gap-2">
        <div className={`flex gap-8 px-6 py-2 text-black dark:text-white `}>
          <div className="grid gap-2">
            <div className="px-2">
              {weight > 0 && reps > 0 && weight && <h5 className="text-sm font-light">{weight && reps ? `${weight} lbs x ${reps} reps` : weight ? `${weight} lbs` : reps ? `${reps} reps` : ''}</h5>}
              {intensity && <h5 className="text-sm font-light">{exercise.set.intensity} RPE</h5>}
              {toFailure && <h5 className="text-sm font-light">{exercise.set.toFailure ? 'To Failure' : ''}</h5>}
              {notes && <p className="text-sm italic">{exercise.set.notes}</p>}
              {tags.length > 0 && <div className="flex flex-wrap gap-2">
                <h5 className="text-sm font-semibold">Tags:</h5>
                <div className="flex gap-2">
                  {exercise.set.tags.map((tag, i) => (
                    <Badge key={`${exercise.id}-set-${i}-tag-${tag}`}> {tag} </Badge>
                  ))}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
