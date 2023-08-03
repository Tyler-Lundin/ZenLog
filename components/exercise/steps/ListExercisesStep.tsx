'use client'
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { Searcher } from '@/components/Searcher';
import { AppDispatch } from '@/_store';
import { nextExerciseStep, setNewExercise } from '@/_store/slices/exerciseSlice';

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
      <div className="fixed py-2 backdrop-blur-sm bg-gradient-to-b from-white to-white/25 dark:from-black dark:to-black/25 ">
        <Searcher search={search} setSearch={setSearch} />
      </div>
      <div className="w-screen  bg-white dark:bg-black pb-20 z-10 grid pt-12">
        <div className="h-full w-full overflow-y-auto">
          {(data && filteredData ? filteredData : data)?.map((exercise: Exercise, index: number) => (
            <div key={exercise.id} className={`dark:text-white text-black w-full border-b border-black/10 dark:border-white/10 overflow-hidden h-fit shadow`} >
              <Button variant="ghost" onClick={() => {
                dispatch(setNewExercise({ exerciseId: exercise.id, exerciseName: exercise.name }))
                dispatch(nextExerciseStep())
              }} className={`flex gap-8 items-center w-full py-8 px-4`} >
                <h2 className={`w-full text-2xl font-thin text-left`}>{exercise.name}</h2>
              </Button>
            </div>
          ))}
          <div className="h-14" />
        </div >
      </div >
    </>
  )
}



