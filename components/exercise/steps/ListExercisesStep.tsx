'use client'
import { nextNewExerciseStep, setNewExercise } from '@/store/appSlice';
import { useDispatch, } from 'react-redux';
import useSwr from 'swr';
import { Button, buttonVariants } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { BsQuestionCircle, BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [detailedIndex, setDetailedIndex] = useState(-1);

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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {(data && filteredData ? filteredData : data)?.map((exercise: Exercise, index: number) => (
          <div
            key={exercise.id}
            className={`dark:text-white text-black  whitespace-nowrap overflow-hidden h-fit shadow grid grid-flow-col px-4 justify-start relative border-b border-t border-gray-500`}
          >

            <div className="grid gap-2 w-96 h-full items-start p-2 text-left">
              {detailedIndex !== index && (

                <Button
                  variant="glass"
                  onClick={() => {
                    dispatch(setNewExercise(exercise))
                    dispatch(nextNewExerciseStep())
                  }}
                  className={
                    `flex gap-8 items-center ${detailedIndex === index ? 'border-b border-gray-400' : 'border-none'} w-max h-20`
                  }
                >
                  <h2 className={`${detailedIndex === index ? 'text-2xl' : 'text-5xl'} font-bold`}>{exercise.name}</h2>
                </Button>
              )}
              <Button className="absolute right-0 top-1/2 -translate-y-1/2" variant="ghost" onClick={() => setDetailedIndex(index === detailedIndex ? -1 : index)}> {index === detailedIndex ? <AiOutlineClose /> : <BsQuestionCircle />} </Button>

              <div className={`${detailedIndex === index ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'} transition-all`}>
                <div className={`flex gap-8`}>
                  <h2 className="text-3xl font-bold">{exercise.name}</h2>
                  <Badge className={`text-xs h-fit self-center`}>{exercise.level}</Badge>
                </div>
                <hr className="border-gray-300  my-4 border" />

                <div className="flex gap-8 flex-col h-full">

                  <div className="grid grid-cols-2 gap-2 items-start text-left">
                    <div className="flex flex-col gap-2 items-start text-left">
                      <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">Primary Muscles</h5>
                      <div className="px-2 grid gap-2">
                        {exercise.primaryMuscles.map((muscle) => <small key={`${muscle}-primary-muscle`} className="text-xs justify-start">{muscle}</small>)}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-left">
                      <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">Secondary Muscles</h5>
                      <div className="px-2 grid gap-2">
                        {exercise.secondaryMuscles.map((muscle) => <small key={`${muscle}-secondary-muscle`} className="text-xs">{muscle}</small>)}
                      </div>
                    </div>
                  </div>

                  <div className={` grid grid-cols-3 justify-center gap-2 text-left w-full`}>

                    <div className="flex flex-col flex-wrap items-start gap-2 text-left w-full place-self-center">
                      <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">Equipment</h5>
                      <div className="px-2 grid gap-2">
                        {Array.isArray(exercise.equipment) && exercise.equipment.map((E) => <small key={`${E}-equipment`} className="text-xs">{E.replace("_", " ")}</small>)}
                      </div>
                    </div>

                    <div className="flex flex-col flex-wrap items-start gap-2 text-left place-self-center">
                      <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">
                        Force
                      </h5>
                      <div className="px-2 grid gap-2">
                        <small className="text-xs">{exercise.force}</small>
                      </div>
                    </div>
                    {exercise.mechanic && (
                      <div className="flex flex-col flex-wrap items-start gap-2 text-left place-self-center">
                        <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">
                          Mechanic
                        </h5>
                        <div className="px-2 grid gap-2">
                          <small className="text-xs">{exercise.mechanic}</small>
                        </div>
                      </div>
                    )}
                  </div>
                  {exercise.tips && (
                    <div className="flex flex-col flex-wrap whitespace-pre-wrap items-start gap-2 text-left place-self-center">
                      <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-sm">
                        Tips
                      </h5>
                      <div className="px-2 grid gap-2">
                        <div className="flex flex-col gap-2">
                          {exercise.tips.map((tip) => <small key={`${tip}-tip`} className="text-xs">{tip}</small>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="glassGreen"
                  className="font-black my-4 w-full justify-self-end z-40 uppercase"
                  onClick={() => {
                    dispatch(setNewExercise(exercise));
                    dispatch(nextNewExerciseStep())
                  }} >
                  Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )

}

