'use client';
import { ExerciseEntry } from "@prisma/client";
import DashboardBlock from "../DashboardBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from 'swr';
import { useEffect } from "react";
import { setExerciseEntries } from "@/store/appSlice";
import { Spinner } from "@/components/ui/Spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExerciseCards() {
  const { id } = useSelector((state: RootState) => state.app.date);
  const dispatch = useDispatch();
  const { data, error } = useSWR(`/api/entries/exercise?date=${id}`, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    console.log("EXERCISE PAGE DATA: ", data)
    if (data) dispatch(setExerciseEntries(data.exerciseEntries));
  }, [data, dispatch, id])


  const exerciseEntries = useSelector((state: RootState) => state.app.date.exerciseEntries);

  console.log({ exerciseEntries, isLoading, data })
  if (isLoading) return (<DashboardBlock><Spinner size="xl" /></DashboardBlock>)
  if (exerciseEntries.length === 0) return (
    <DashboardBlock>
      <p className="text-black dark:text-white">No exercises logged for this date.</p>
    </DashboardBlock>
  )

  return (
    <DashboardBlock>
      <ul className="grid gap-4">
        {Array.isArray(exerciseEntries) && exerciseEntries.map((exercise: ExerciseEntry) => (
          <li key={exercise.id} className="bg-gray-100 rounded-md p-4">
            <h3 className="text-xl font-semibold">{exercise.exerciseName}</h3>
            <ul className="grid gap-4">
              {exercise.sets.map((set, i) => (
                <li key={`${exercise.id}-set-${i}`} className="grid gap-4 grid-cols-2">
                  <span className="text-sm font-semibold">{set.weight} lbs</span>
                  <span className="text-sm font-semibold">{set.reps} reps</span>
                  <span className="text-sm font-semibold">{set.intensity} intensity</span>
                  <span className="text-sm font-semibold">{set.toFailure ? 'To Failure' : 'Not To Failure'} </span>
                  <span className="text-sm font-semibold">{set.notes}</span>
                  {set.tags.map((tag, i) => (
                    <span key={`${exercise.id}-set-${i}-tag`} className="text-sm font-semibold">{tag}</span>
                  ))}
                </li>
              ))}
            </ul>
          </li>
        ))}

      </ul>
    </DashboardBlock>
  )
}
