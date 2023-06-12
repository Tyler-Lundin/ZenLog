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
import ExerciseEntryForm from './ExerciseEntryForm';
import { ExerciseSet } from '@prisma/client';

interface ExerciseEntry {
  reps: number;
  weight: number;
  toFailure: boolean;
  intensity: number;
  notes: string;
  tags: string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LogExerciseForm() {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState<ExerciseEntry[]>([
    { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] },
  ]);
  const [newTags, setNewTags] = useState<string[]>(sets.map(() => ''));

  const setsLength = sets.length;

  const handleExerciseNameChange = (name: string) => {
    setExerciseName(name);
  };


  const { data, isLoading } = useSwr('/api/exercises', fetcher);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ exerciseName, sets });

  };

  if (isLoading) return <Spinner size="xl" />

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
          <Button disabled={setsLength === 6} variant="default" size="sm" className="min-w-max" onClick={handleAddSet}>Add Set</Button>
        </div>
        <div className={cn("grid gap-2 place-content-center", setsLength > 1 && "lg:grid-cols-2", setsLength > 2 && "xl:grid-cols-3")}>
          {sets.map((set, setIndex) => (
            <ExerciseEntryForm
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
        <Button variant="default" size="2xl" className="mt-4">Log Exercise</Button>
      </DashboardBlock>
    </form>
  );
}

