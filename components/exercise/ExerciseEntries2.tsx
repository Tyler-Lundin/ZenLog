'use client'
import { ExerciseEntry as IExerciseEntry } from '@prisma/client'
import ExerciseEntry from './ExerciseEntry'
import useExerciseEntries from '@/hooks/useExerciseEntries'


function ExerciseEntries() {
  const { exerciseEntries } = useExerciseEntries();
  console.log('exerciseEntries', exerciseEntries)
  if (exerciseEntries.length === 0) return <div className="text-center font-black uppercase dark:text-white">No exercises yet</div>
  return (
    <ul className='flex flex-wrap w-full gap-4 '>
      {Array.isArray(exerciseEntries) &&
        exerciseEntries.map((exercise: IExerciseEntry) => (
          <ExerciseEntry key={exercise.id} exercise={exercise} />
        ))}
    </ul>
  )
}

export default ExerciseEntries;
