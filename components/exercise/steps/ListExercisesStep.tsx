'use client'
import { nextNewExerciseStep, setNewExerciseName } from '@/store/appSlice';
import { useDispatch, } from 'react-redux';
import useSwr from 'swr';
import { Button } from '@/components/ui/button';
import { Exercise } from '@prisma/client';
import { Spinner } from '@/components/ui/Spinner';
import DashboardBlock from '@/components/dashboard/DashboardBlock';
import { Badge } from '@/components/ui/badge';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListExercisesStep() {
  const { data, error } = useSwr('/api/exercises', fetcher);
  const isLoading = !data && !error;
  const dispatch = useDispatch();

  if (isLoading) return <DashboardBlock> <Spinner size="xl" /> </DashboardBlock>;
  if (error) return <DashboardBlock> <p className="text-uppercase text-red-400">Failed to load</p> </DashboardBlock>;

  return (
    <div className="h-full w-full grid gap-4 p-8">
      {data?.map((exercise: Exercise) => (
        <Button
          key={exercise.id}
          className="whitespace-nowrap overflow-hidden h-fit w-full shadow grid grid-flow-col px-4 justify-start relative border-b border-t border-gray-500"
          variant="ghost"
          onClick={() => {
            dispatch(setNewExerciseName(exercise.name))
            dispatch(nextNewExerciseStep())
          }}>
          <div className="flex flex-col gap-2 w-full h-full items-start p-2 text-left">
            <div className="flex gap-8 items-center border-b w-full pb-2 border-gray-400">
              <h2 className="text-2xl font-bold">{exercise.name}</h2>
              <Badge className="text-xs">{exercise.level}</Badge>
            </div>
            <div className="flex gap-8 flex-col h-full">
              <div className="flex gap-2 items-start text-left">
                <div className="flex flex-col gap-2 items-start text-left">
                  <h5 className="text-gray-600 font-bold text-sm">Primary Muscles</h5>
                  {exercise.primaryMuscles.map((muscle) => <small key={`${muscle}-primary-muscle`} className="text-xs justify-start">{muscle}</small>)}
                </div>
                <hr className="border-gray-300 h-16  border" />
                <div className="flex flex-col items-start gap-2 text-left">
                  <h5 className="text-gray-600 font-bold text-sm">Secondary Muscles</h5>
                  {exercise.secondaryMuscles.map((muscle) => <small key={`${muscle}-secondary-muscle`} className="text-xs">{muscle}</small>)}
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2 text-left">
                <div className="flex flex-col flex-wrap items-start gap-2 text-left">
                  <h5 className="text-gray-600 text-sm font-bold">Equipment</h5>
                  {Array.isArray(exercise.equipment) && exercise.equipment.map((E) => <small key={`${E}-equipment`} className="text-xs">{E.replace("_", " ")}</small>)}
                </div>
                <hr className="border-gray-300 h-16  border" />
                <div className="flex flex-col flex-wrap items-start gap-2 text-left">
                  <h5 className="text-gray-600 text-sm font-bold">Force</h5>
                  <small className="text-xs">{exercise.force}</small>
                </div>
                {exercise.mechanic && (
                  <>
                    <hr className="border-gray-300 h-16  border" />
                    <div className="flex flex-col flex-wrap items-start gap-2 text-left">
                      <h5 className="text-gray-600 text-sm font-bold">Mechanic</h5>
                      <small className="text-xs">{exercise.mechanic}</small>
                    </div>
                  </>
                )}
              </div>
              {exercise.tips && (
                <>
                  <div className="flex flex-col flex-wrap whitespace-pre-wrap items-start gap-2 text-left">
                    <h5 className="text-gray-600 text-sm font-bold">Tips</h5>
                    <div className="flex flex-col gap-2">
                      {exercise.tips.map((tip) => <small key={`${tip}-tip`} className="text-xs">{tip}</small>)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Button>
      ))}
    </div>
  )

}

