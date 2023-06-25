'use client';
import { ExerciseEntry as IExerciseEntry } from "@prisma/client";
import DashboardBlock from "../dashboard/DashboardBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from 'swr';
import { useEffect } from "react";
import { setExerciseEntries } from "@/store/appSlice";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";
import ExerciseEntry from "./ExerciseEntry";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const dateToTime = (date: string) => {
  const D = new Date(date)
  return D.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const sortEntries = (entries: ExerciseEntry[]): ExerciseEntry[] => {
  const copyEntries = [...entries];
  return copyEntries.sort((a, b) => {
    return new Date(b.createdAt as unknown as string).getTime() - new Date(a.createdAt as unknown as string).getTime();
  });
};

const RenderIfDateLoaded = () => {
  const { id: dateId } = useSelector((state: RootState) => state.app.date);
  if (!dateId) return null;
  return <ExerciseEntries />
}

function ExerciseEntries() {
  const { id: dateId } = useSelector((state: RootState) => state.app.date);
  const dispatch = useDispatch();
  const { isSorted } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const { data, error, mutate } = useSWR(`/api/entries/exercise?date=${dateId}`, fetcher);
  const isLoading = !data && !error;
  const exerciseEntries = useSelector((state: RootState) => state.app.date.ExerciseEntries);

  useEffect(() => {
    if (data) dispatch(setExerciseEntries(data.exerciseEntries));
    if (!data) dispatch(setExerciseEntries([]))
  }, [data, dispatch, dateId])


  useEffect(() => {
    mutate();
  }, [exerciseEntries, mutate])

  if (isLoading) return (<DashboardBlock><Spinner size="xl" /></DashboardBlock>)

  if (exerciseEntries.length === 0) return (
    <DashboardBlock>
      <p className="text-black dark:text-white">No exercises logged for this date.</p>
    </DashboardBlock>
  )

  const sorted = sortEntries(exerciseEntries);

  return (
    <>
      <ul className="flex flex-wrap w-full gap-4 ">
        {Array.isArray(exerciseEntries) && (isSorted ? sorted : exerciseEntries).map((exercise: IExerciseEntry) => (
          <ExerciseEntry key={exercise.id} exercise={exercise} />
        ))}
      </ul>
    </>
  )
}

export default RenderIfDateLoaded;
