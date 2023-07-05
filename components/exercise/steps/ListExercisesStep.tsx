'use client'
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { AppDispatch, } from '@/store/store';
import { nextNewExerciseStep, setNewExercise } from '@/store/appSlice';
import { Searcher } from '@/components/Searcher';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  if (isLoading) return <DashboardBlock> <Spinner size="xl" /> </DashboardBlock>;
  if (error) return <DashboardBlock> <p className="text-uppercase text-red-400">Failed to load</p> </DashboardBlock>;
  const filteredData = data?.filter((exercise: Exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Searcher search={search} setSearch={setSearch} />
      <div className="h-full w-full ">
        {(data && filteredData ? filteredData : data)?.map((exercise: Exercise) => (
          <div key={exercise.id} className={`dark:text-white text-black w-full overflow-hidden h-fit shadow dark:border-y dark:border-white/20`} >
            <Button variant="ghost" onClick={() => {
              dispatch(setNewExercise(exercise))
              dispatch(nextNewExerciseStep())
            }} className={`flex gap-8 items-center h-24 w-full`} >
              <h2 className={`text-2xl md:text-4xl w-full text-center lg:text-6xl `}>{exercise.name}</h2>
            </Button>
          </div>
        ))}
      </div >
    </>
  )
}



