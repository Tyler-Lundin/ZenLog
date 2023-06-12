import { Button, buttonVariants } from '@/components/ui/button';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
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

  const handleAddSet = () => {
    if (setsLength === 6) return;
    if (setsLength === 0) return setSets([{ reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }]);
    const prevSet = sets[setsLength - 1];
    setSets([...sets, prevSet]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Submit logic here
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
              <SelectGroup className="bg-black dark:bg-white">
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
        <div className={cn("grid gap-2 place-content-center", setsLength > 1 && "lg:grid-cols-2 xl:grid-cols-3")}>
          {sets.map((set, index) => (
            <div key={index} className="border dark:border-white border-black p-8 rounded-lg relative grid gap-4 pt-14">
              <h3 className="absolute dark:text-white top-4 uppercase font-thin left-8">Set {index + 1}</h3>
              <Button variant="destructive" size="smSquare" className="p-2 absolute text-md top-2 right-8" onClick={() => setSets(sets.filter((_, i) => i !== index))}> <AiOutlineClose /> </Button>
              <div className="flex gap-2">
                <label className="self-center dark:text-white">Reps</label>
                <input className="p-2 w-full rounded-md" type="number" value={set.reps} onChange={(event) => handleSetChange(index, 'reps', event)} />
              </div>
              <div className="flex gap-2">
                <label className="self-center dark:text-white">Weight</label>
                <input className="p-2 w-full rounded-md" type="number" value={set.weight} onChange={(event) => handleSetChange(index, 'weight', event)} />
              </div>
              <div className="flex gap-2">
                <label className="self-center dark:text-white">To Failure</label>
                <input className=" w-8" type="checkbox" checked={set.toFailure} onChange={(event) => handleSetChange(index, 'toFailure', event)} />
              </div>
              <div className="flex gap-2">
                <label className="self-center dark:text-white">Intensity</label>
                <input className="p-2 w-full rounded-md" type="number" value={set.intensity} onChange={(event) => handleSetChange(index, 'intensity', event)} />
              </div>
              <div className="flex gap-2">
                <label className="self-center dark:text-white">Notes</label>
                <textarea className="p-2 w-full rounded-md" value={set.notes} onChange={(event) => handleSetChange(index, 'notes', event)} />
              </div>
            </div>
          ))}
        </div>
        <Button variant="default" size="2xl" className="mt-4">Log Exercise</Button>
      </DashboardBlock>
    </form>
  );
}

