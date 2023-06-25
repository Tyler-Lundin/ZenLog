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

  return (
    <li key={exercise.id} className="dark:bg-black bg-zinc-200 text-black dark:text-white rounded-md p-4 w-full border border-black dark:border-white">
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{exercise.exerciseName}</h3>
          <p className="text-sm font-semibold">{dateToTime(exercise.createdAt as unknown as string)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <h3 className="text-sm font-semibold">Total Volume: {getVolume(exercise.set)} lbs</h3>
        </div>
      </div>

      <hr className="my-2 border-zinc-600" />

      <div className="grid grid-cols-2 gap-2">
        <div className={`flex gap-8 px-6 py-2 text-black dark:text-white `}>
          <div className="grid gap-2">
            <div className="px-2">
              {exercise?.set?.weight && <h5 className="text-sm font-light">{exercise.set.weight && exercise.set.reps ? `${exercise.set.weight} lbs x ${exercise.set.reps} reps` : exercise.set.weight ? `${exercise.set.weight} lbs` : exercise.set.reps ? `${exercise.set.reps} reps` : ''}</h5>}
              {exercise?.set?.intensity && <h5 className="text-sm font-light">{exercise.set.intensity} RPE</h5>}
              {exercise?.set?.toFailure && <h5 className="text-sm font-light">{exercise.set.toFailure ? 'To Failure' : ''}</h5>}
              {exercise?.set?.notes && <p className="text-sm italic">{exercise.set.notes}</p>}
              {exercise?.set?.tags?.length > 0 && <div className="flex flex-wrap gap-2">
                <h5 className="text-sm font-semibold">Tags:</h5>
                {exercise.set.tags.map((tag, i) => (
                  <Badge key={`${exercise.id}-set-${i}-tag-${tag}`}> {tag} </Badge>
                ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
