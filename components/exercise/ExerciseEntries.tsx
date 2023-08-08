'use client'
import { ExerciseEntry as IExerciseEntry } from '@prisma/client'
import ExerciseEntry from './ExerciseEntry'
import useExerciseEntries from '@/hooks/useExerciseEntries'
import { Spinner } from '../ui/Spinner';


function ExerciseEntries() {
  const { exerciseEntries, isLoading } = useExerciseEntries();
  if (isLoading) return <div className="flex justify-center"><Spinner /></div>
  if (exerciseEntries.length === 0 && !isLoading) return <div className="text-center font-black uppercase dark:text-white">No exercises yet</div>
  return (
    <>
      {Array.isArray(exerciseEntries) &&
        exerciseEntries.map((exercise: IExerciseEntry) => (
          <ExerciseEntry key={exercise.id} exercise={exercise} />
        ))}
      <div className="h-8" />
      <div className="h-32 opacity-50">
        <h3 className="text-center text-2xl font-bold dark:text-white"> No more exercises to show </h3>
      </div>
    </>
  )
}

export default ExerciseEntries;
