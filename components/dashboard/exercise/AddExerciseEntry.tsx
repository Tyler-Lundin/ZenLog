'use client';
import React, { useState } from 'react';
import DashboardBlock from '../DashboardBlock';
import { cn } from "@/lib/utils";
import useSwr from 'swr';
import { Spinner } from '@/components/ui/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addExerciseEntry, setNewExerciseName, setNewExerciseSets } from '@/store/appSlice';
import { setExerciseError, toggleLogExerciseForm } from '@/store/uiSlice';
import { SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ExerciseSetSteps from './ExerciseSetSteps';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const EMPTY_SET = { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }

export default function AddExerciseEntry() {
  const { data, isLoading } = useSwr('/api/exercises', fetcher);
  const dispatch = useDispatch();
  const { isLogExerciseFormOpen } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const newExercise = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { id: dateId } = useSelector((state: RootState) => state.app.date);


  const { exerciseName, sets } = newExercise;
  const setsLength = sets.length;

  // ### STITCH ZONE ###
  const [step, setStep] = useState(0);
  // ### STITCH ZONE ###


  if (!isLogExerciseFormOpen) return null;

  const handleAddSet = () => {
    if (setsLength === 6) return;
    if (setsLength === 0) {
      dispatch(setNewExerciseSets([{ ...EMPTY_SET }]));
      return;
    }

    const prevSet = sets[setsLength - 1];

    dispatch(setNewExerciseSets([...sets, prevSet]));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!exerciseName) return;
    const exerciseId = data?.find((exercise: any) => exercise.name === exerciseName)?.id;
    if (!exerciseId) return dispatch(setExerciseError('Exercise not found!'));
    try {
      const res = await fetch('/api/log/exercise', {
        method: 'POST',
        body: JSON.stringify({
          ...newExercise,
          exerciseId,
          dateId,
        }),
      }).then((res) => res.json());

      if (res.error) return dispatch(setExerciseError(res.error))
      if (res.success) {
        dispatch(setNewExerciseName(''));
        dispatch(setNewExerciseSets([]));
        dispatch(addExerciseEntry(res.data))
        dispatch(toggleLogExerciseForm())
      }


    } catch (err: any) {
      dispatch(setExerciseError(err.message || 'Something went wrong logging new exercise!'))
    }

  };

  if (isLoading) return <DashboardBlock> <Spinner size="xl" /> </DashboardBlock>;

  const isDisabled = !exerciseName || setsLength === 0;

  // # # # # # # # # # # # # # # # # # # # # STITCH ZONE # # # # # # # # # # # # # # # # # # #
  //


  const STEPS = [
    {
      title: 'Select an Exercise',
      content: (
        <>
          <div className="grid items-center z-40 bg-white/80 gap-4 dark:bg-black/80 backdrop-blur-sm  w-full overflow-y-auto h-full">
            {data?.map((exercise: any) => (
              <Button key={exercise.id} className="whitespace-nowrap" variant="large" size="5xl" onClick={() => {
                dispatch(setNewExerciseName(exercise.name))
                setStep(1)
              }}>{exercise.name}</Button>
            ))}
          </div>
        </>
      )
    },
    {
      title: 'Add Sets',
      content: (
        <>
          <div className="h-full bg-white dark:bg-black w-full overflow-y-auto py-4">
            <Button type="button" disabled={setsLength === 6 || !exerciseName} variant="default" size="sm" className="min-w-max fixed" onClick={handleAddSet}>Add Set {setsLength + 1}</Button>
            {exerciseName && (
              <div className={cn("grid w-full h-full", setsLength > 1 && "lg:grid-cols-2", setsLength > 2 && "xl:grid-cols-3")}>
                <ExerciseSetSteps />
              </div>
            )}
          </div>
        </>
      )
    },
    {
      title: 'Add to Workout',
      content: (
        <>
          <div className="z-40 bg-white/80 backdrop-blur-sm dark:bg-black/80 p-2 w-full grid place-content-center h-16">
            <Button disabled={isDisabled} type="submit" variant="default" size="xl" >Log Exercise</Button>
          </div>
        </>
      )
    },
  ]

  const currentStep = STEPS[step]

  // # # # # # # # # # # # # # # # # # # # # STITCH ZONE # # # # # # # # # # # # # # # # # # #
  return (
    <SheetContent onClose={() => dispatch(toggleLogExerciseForm())} position="top" size={'full'}>
      <form onSubmit={handleSubmit} className="h-screen w-full">
        <div className="w-full h-32 bg-white dark:bg-zinc-950 grid place-content-center">
          <h1 className=" dark:text-white uppercase text-2xl lg:text-5xl font-bold text-center">{currentStep.title}</h1>
        </div>
        {currentStep.content}
      </form>
    </SheetContent>
  );
}

