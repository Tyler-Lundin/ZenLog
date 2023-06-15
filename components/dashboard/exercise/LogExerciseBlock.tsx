'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import React from 'react';
import DashboardBlock from '../DashboardBlock';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSwr from 'swr';
import { Spinner } from '@/components/ui/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addExerciseEntry, setNewExerciseName, setNewExerciseSets } from '@/store/appSlice';
import ExerciseSetCard from './ExerciseSetCard';
import { setExerciseError, toggleLogExerciseForm } from '@/store/uiSlice';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EMPTY_SET = { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }

export default function LogExerciseBlock() {

  const { data, isLoading } = useSwr('/api/exercises', fetcher);
  const dispatch = useDispatch();
  const { isLogExerciseFormOpen } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const newExercise = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { id: dateId } = useSelector((state: RootState) => state.app.date);

  const { exerciseName, sets } = newExercise;
  const setsLength = sets.length;

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

      if (res.error) return;
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

  if (isLoading) return <DashboardBlock><Spinner size="xl" /></DashboardBlock>;

  return (
    <form onSubmit={handleSubmit}>
      <DashboardBlock>
        <div className="flex gap-4 mb-4 items-center">
          <Select onValueChange={(value: string) => dispatch(setNewExerciseName(value))}>
            <SelectTrigger className={buttonVariants({ variant: 'default', size: 'sm' })}>
              <SelectValue placeholder="Select Exercise" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-black dark:bg-white text-white dark:text-black">
                <SelectLabel>Exercise</SelectLabel>
                {data?.map((exercise: any) => (
                  <SelectItem key={exercise.id} value={exercise.name}>
                    {exercise.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="button" disabled={setsLength === 6 || !exerciseName} variant="default" size="sm" className="min-w-max" onClick={handleAddSet}>Add Set {setsLength + 1}</Button>
        </div>
        {exerciseName && (
          <>
            <div className={cn("grid gap-2 place-content-center", setsLength > 1 && "lg:grid-cols-2", setsLength > 2 && "xl:grid-cols-3")}>
              {sets.map((_, setIndex) => (
                <ExerciseSetCard key={setIndex} index={setIndex} />
              ))}
            </div>
            <Button type="submit" variant="default" size="2xl" className="mt-4">Log Exercise</Button>
          </>
        )}
      </DashboardBlock>
    </form>
  );
}

