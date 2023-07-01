'use client'
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setNewExercise } from '@/store/appSlice';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const [search, setSearch] = useState('');
  const [detailedIndex, setDetailedIndex] = useState(-1);
  const dispatch = useDispatch<AppDispatch>();
  if (isLoading) return <DashboardBlock> <Spinner size="xl" /> </DashboardBlock>;
  if (error) return <DashboardBlock> <p className="text-uppercase text-red-400">Failed to load</p> </DashboardBlock>;
  const filteredData = data?.filter((exercise: Exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()));





  return (
    <div className="h-full w-full gap-4 ">
      <div className="flex p-8 gap-4 items-center relative">
        <input
          id="search"
          type="text"
          className="border border-gray-400 rounded-md p-2 w-full"
          placeholder="Search for an exercise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <BsSearch className="text-black absolute right-12 top-1/2 -translate-y-1/2 z-10" />
      </div>

      <div className="grid grid-cols-1 w-full">
        {(data && filteredData ? filteredData : data)?.map((exercise: Exercise, index: number) => (
          <div key={exercise.id} className={`dark:text-white text-black overflow-hidden h-fit shadow grid grid-flow-col border-b border-t border-gray-500`} >
            {detailedIndex !== index && (
              <Button variant="ghost"
                onClick={() => {
                  dispatch(setNewExercise(exercise))
                }}
                className={`flex gap-8 items-center h-20 col-span-8`}
              >
                <h2 className={`text-2xl lg:text-6xl font-bold`}>{exercise.name}</h2>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div >
  )

}



