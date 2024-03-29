'use client'
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import { Searcher } from '@/components/Searcher';
import { AppDispatch } from '@/_store';
import { nextExerciseStep, setNewExercise } from '@/_store/slices/exerciseSlice';
import FuzzySearch from 'fuzzy-search';
import { setLoading } from '@/_store/slices/uiSlice';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isLoading) dispatch(setLoading(true))
    else setTimeout(() => dispatch(setLoading(false)), 500);
  }, [dispatch, isLoading])
  const searcher = new FuzzySearch(data, ['name'], { caseSensitive: false });
  const exercises = searcher.search(search) as Exercise[];

  if (error)
    return <DashboardBlock> <p className="text-uppercase text-red-400">Failed to load</p> </DashboardBlock>;

  return (
    <>
      <div className="fixed h-16 backdrop-blur-sm bg-gradient-to-b from-white to-white/25 dark:from-black dark:to-black/50 left-1/2 -translate-x-1/2 w-screen grid place-content-center">
        <Searcher search={search} setSearch={setSearch} />
      </div>
      <div className="w-screen  bg-white dark:bg-black pb-20 z-10 grid pt-16">
        <div className="h-full w-full overflow-y-auto">
          {exercises.map((exercise: Exercise) => (
            <div key={exercise.id} className={`dark:text-white text-black w-full border-b border-black/10 dark:border-white/10 overflow-hidden h-fit shadow`} >
              <Button variant="ghost" onClick={() => {
                dispatch(setNewExercise({ exerciseId: exercise.id, exerciseName: exercise.name }))
                dispatch(nextExerciseStep())
              }} className={`flex gap-8 items-center w-full py-8 px-4`} >
                <h2 className={`w-full text-2xl font-thin text-center`}>{exercise.name}</h2>
              </Button>
            </div>
          ))}
          <div className="h-14" />
        </div >
      </div >
    </>
  )
}



