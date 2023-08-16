'use client'
import { ExerciseEntry as IExerciseEntry } from '@prisma/client'
import ExerciseEntry from './ExerciseEntry'
import useExerciseEntries from '@/hooks/useExerciseEntries'
import { AppDispatch } from '@/_store';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/_store/slices/uiSlice';

function ExerciseEntries() {
  const { exerciseEntries, isLoading } = useExerciseEntries();
  const dispatch = useDispatch<AppDispatch>();
  if (isLoading) dispatch(setLoading(true));
  else dispatch(setLoading(false));

  return (
    <>
      {Array.isArray(exerciseEntries) &&
        exerciseEntries.map((exercise: IExerciseEntry, index: number) => {
          if (index === 0) return <ExerciseEntry key={exercise.id} exercise={exercise} />

          const isLastChild = (exerciseEntries[index + 1]?.exerciseId !== exercise.exerciseId)
          const isChild = (exerciseEntries[index - 1]?.exerciseId === exercise.exerciseId)
          const isParent = (exerciseEntries[index + 1]?.exerciseId !== exercise.exerciseId)
          return (
            <ExerciseEntry key={exercise.id} exercise={exercise} isParentInSet={!isChild && isParent} isChildInSet={isChild} isLastChildInSet={isLastChild} />
          )
        })}
      <div className="h-8" />
      {!Array.isArray(exerciseEntries) && <p className="text-center text-2xl font-thin">No exercises logged</p>}
      {Array.isArray(exerciseEntries) && exerciseEntries.length === 0 && <p className="text-center text-2xl font-thin">No exercises logged</p>}
    </>
  )
}

export default ExerciseEntries;
