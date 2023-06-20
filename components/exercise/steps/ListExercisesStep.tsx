'use client'
import { nextNewExerciseStep, setNewExerciseName } from '@/store/appSlice';
import { useDispatch, } from 'react-redux';
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const dispatch = useDispatch();

  if (isLoading) return <DashboardBlock> <Spinner size="xl" /> </DashboardBlock>;
  if (error) return <DashboardBlock> <p className="text-uppercase text-red-400">Failed to load</p> </DashboardBlock>;
  return (
    <>
      {data?.map((exercise: Exercise) => (<Button key={exercise.id} className="whitespace-nowrap border-b border-gray-500" variant="ghost" size="4xl" onClick={() => {
        dispatch(setNewExerciseName(exercise.name))
        dispatch(nextNewExerciseStep())
      }}>
        {exercise.name}
        {exercise.description}
        {exercise.category}
        {exercise.equipment}
      </Button>
      ))}
    </>
  )

}

const exerciseOptions = () => {

}
