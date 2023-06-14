import { Button, buttonVariants } from '@/components/ui/button';
import React, { useState } from 'react';
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
import { ExerciseSet } from '@prisma/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addExerciseEntry } from '@/store/appSlice';
import ExerciseSetCard from './ExerciseSetCard';

interface ExerciseEntry {
  reps: number;
  weight: number;
  toFailure: boolean;
  intensity: number;
  notes: string;
  tags: string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LogExerciseBlock() {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState<ExerciseEntry[]>([
    { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] },
  ]);
  const [newTags, setNewTags] = useState<string[]>(sets.map(() => ''));
  const dispatch = useDispatch();
  const setsLength = sets.length;
  const { id: dateId } = useSelector((state: RootState) => state.app.date);
  const { data, isLoading } = useSwr('/api/exercises', fetcher);


  const handleExerciseNameChange = (name: string) => {
    setExerciseName(name);
  };

  const handleSetChange = (
    index: number,
    field: keyof ExerciseEntry,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (field === 'reps' && +event.target.value < 0) return;
    if (field === 'intensity') if (+event.target.value < 0 || +event.target.value > 10) return;

    const newSets = [...sets];
    newSets[index] = {
      ...newSets[index],
      [field]: event.target.value,
    };
    setSets(newSets);
  };

  const handleBooleanChange = (index: number, field: keyof ExerciseSet, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSets = [...sets];
    updatedSets[index] = {
      ...updatedSets[index],
      [field]: event.target.checked,
    };
    setSets(updatedSets);
  };

  const handleAddSet = () => {
    if (setsLength === 6) return;
    if (setsLength === 0) {
      setSets([{ reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }]);
      setNewTags(['']);
      return;
    }

    const prevSet = sets[setsLength - 1];
    setSets([...sets, prevSet]);
    setNewTags([...newTags, '']);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!exerciseName) return;
    const exerciseId = data?.find((exercise: any) => exercise.name === exerciseName)?.id;
    const exerciseEntry = {
      userId: '',
      exerciseId,
      exerciseName,
      sets,
      dateId,
    }
    console.log({ exerciseEntry });
    try {

      const res = await fetch('/api/log/exercise', {
        method: 'POST',
        body: JSON.stringify(exerciseEntry),
      }).then((res) => res.json());

      console.log({ res });
      if (res.error) return;
      if (res.success) {
        setExerciseName('');
        setSets([{ reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }]);
        setNewTags(['']);
        dispatch(addExerciseEntry(res.data))
      }


    } catch (err: any) {
      console.log(err);
    }

  };

  if (isLoading) return <DashboardBlock><Spinner size="xl" /></DashboardBlock>;

  return (
    <form onSubmit={handleSubmit}>
      <DashboardBlock>
        <div className="flex gap-4 mb-4 items-center">
          <Select onValueChange={handleExerciseNameChange}>
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
              {sets.map((set, setIndex) => (
                <ExerciseSetCard
                  key={setIndex}
                  set={set}
                  setIndex={setIndex}
                  handleSetChange={handleSetChange}
                  setSets={setSets}
                  sets={sets}
                  handleBooleanChange={handleBooleanChange}
                />
              ))}
            </div>
            <Button type="submit" variant="default" size="2xl" className="mt-4">Log Exercise</Button>
          </>
        )}
      </DashboardBlock>
    </form>
  );
}

