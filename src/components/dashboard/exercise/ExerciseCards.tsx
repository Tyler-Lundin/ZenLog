'use client';
import { ExerciseEntry } from "@prisma/client";
import DashboardBlock from "../DashboardBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from 'swr';
import { useEffect, useState } from "react";
import { setExerciseEntries } from "@/store/appSlice";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const dateToString = (date: string) => {
  const D = new Date(date)
  return D.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


const sortEntries = (entries: ExerciseEntry[]): ExerciseEntry[] => {
  const copyEntries = [...entries];
  return copyEntries.sort((a, b) => {
    return new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime();
  });
};

export default function ExerciseCards() {
  const { id } = useSelector((state: RootState) => state.app.date);
  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const { data, error } = useSWR(`/api/entries/exercise?date=${id}`, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) dispatch(setExerciseEntries(data.exerciseEntries));
  }, [data, dispatch, id])

  const exerciseEntries = useSelector((state: RootState) => state.app.date.exerciseEntries);


  console.log({ exerciseEntries })

  if (isLoading) return (<DashboardBlock><Spinner size="xl" /></DashboardBlock>)
  if (exerciseEntries.length === 0) return (
    <DashboardBlock>
      <p className="text-black dark:text-white">No exercises logged for this date.</p>
    </DashboardBlock>
  )

  const sorted = sortEntries(exerciseEntries);

  return (
    <DashboardBlock>
      <div className="flex gap-4 w-full items-center mb-4">
        <h2 className="text-2xl font-semibold dark:text-white">Exercises</h2>
        <div className="flex gap-2">
          <Button size="smSquare" onClick={() => setIsSorted(!isSorted)}>{isSorted ? <BsArrowUp /> : <BsArrowDown />} </Button>
        </div>
      </div>

      <ul className="flex flex-wrap w-full gap-4">
        {Array.isArray(exerciseEntries) && (isSorted ? sorted : exerciseEntries).map((exercise: ExerciseEntry) => (
          <li key={exercise.id} className="dark:bg-gray-200 bg-zinc-700 text-white dark:text-black rounded-md p-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{exercise.exerciseName}</h3>
              <p className="text-sm font-semibold">{dateToString(exercise.createdAt as unknown as string)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <h3 className="text-sm font-semibold">Total Volume: {exercise.sets.reduce((total, { weight, reps }) => {
                return total + (weight * reps);
              }, 0)}</h3>
              <h3 className="text-sm font-semibold">Total Sets: {exercise.sets.length}</h3>
              <h3 className="text-sm font-semibold">Total Reps: {exercise.sets.reduce((total, { reps }) => {
                return total + reps;
              }, 0)}</h3>
              <h3 className="text-sm font-semibold">Average Intensity: {(exercise.sets.reduce((total, { intensity }) => {
                return total + intensity;
              }, 0) / exercise.sets.length).toFixed(2)}</h3>

            </div>
            <hr className="my-2 border-gray-500" />
            <div className="grid lg:grid-flow-col gap-2 w-full">
              {exercise.sets.map(({ weight, reps, intensity, toFailure, notes, tags }, i) => (
                <div key={`${exercise.id}-set-${i}`} className="flex gap-8 border rounded-lg dark:bg-gray-100 border-gray-500 p-4">
                  <ul className="grid gap-2">
                    <h3 className="underline underline-offset-2 decoration-1">Set {i + 1}</h3>
                    <li className="text-sm font-semibold">{weight ? `${weight} lbs` : 'No Weight'}</li>
                    <li className="text-sm font-semibold">{reps === 1 ? `${reps} rep` : `${reps} reps`}</li>
                    <li className="text-sm font-semibold">{intensity} intensity</li>
                    <li className="text-sm font-semibold">{toFailure ? 'To Failure' : 'Not to Failure'}</li>
                    {notes && <li className="text-sm italic">{notes}</li>}
                    <li className="flex flex-wrap gap-2">
                      <h3 className="text-sm font-semibold">Tags:</h3>
                      {tags.map((tag, i) => (
                        <Badge key={`${exercise.id}-set-${i}-tag-${tag}`}> {tag} </Badge>
                      ))}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}

      </ul>
    </DashboardBlock>
  )
}
