'use client';
import { ExerciseEntry } from "@prisma/client";
import DashboardBlock from "../dashboard/DashboardBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useSWR from 'swr';
import { useEffect } from "react";
import { setExerciseEntries } from "@/store/appSlice";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/badge";

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
  const { data, error } = useSWR(`/api/entries/exercise?date=${dateId}`, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) dispatch(setExerciseEntries(data.exerciseEntries));
  }, [data, dispatch, dateId])

  const exerciseEntries = useSelector((state: RootState) => state.app.date.ExerciseEntries);

  if (isLoading) return (<DashboardBlock><Spinner size="xl" /></DashboardBlock>)

  if (exerciseEntries.length === 0) return (
    <DashboardBlock>
      <p className="text-black dark:text-white">No exercises logged for this date.</p>
    </DashboardBlock>
  )

  const sorted = sortEntries(exerciseEntries);
  const getVolume = (sets: { weight: number, reps: number }[]) => {
    return sets.reduce((total, { weight = 0, reps = 0 }) => {
      return total + (weight * reps);
    }, 0)
  }
  const getTotalReps = (sets: { reps: number }[]) => {
    return sets.reduce((total, { reps = 0 }) => {
      return total + reps;
    }, 0)
  }
  const getAverageIntensity = (sets: { intensity: number }[]) => {
    return sets.reduce((total, { intensity = 0 }) => {
      return total + intensity;
    }, 0) / sets.length;
  }


  return (
    <>

      <ul className="flex flex-wrap w-full gap-4 ">
        {Array.isArray(exerciseEntries) && (isSorted ? sorted : exerciseEntries).map((exercise: ExerciseEntry) => (
          <li key={exercise.id} className="dark:bg-black bg-zinc-200 text-black dark:text-white rounded-md p-4 w-full border border-black dark:border-white">

            <div className="">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{exercise.exerciseName}</h3>
                <p className="text-sm font-semibold">{dateToTime(exercise.createdAt as unknown as string)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <h3 className="text-sm font-semibold">Total Volume: {getVolume(exercise.sets)} lbs</h3>
                <h3 className="text-sm font-semibold">Total Sets: {exercise.sets.length}</h3>
                <h3 className="text-sm font-semibold">Total Reps: {getTotalReps(exercise.sets)}</h3>
                <h3 className="text-sm font-semibold">Average Intensity: {getAverageIntensity(exercise.sets)}</h3>
              </div>
            </div>

            <hr className="my-2 border-zinc-600" />

            <div className="grid grid-cols-2 gap-2">
              {exercise.sets.map(({ weight, reps, intensity, toFailure, notes, tags }, i) => (
                <div key={`${exercise.id}-set-${i}`} className={`flex gap-8 px-6 py-2 text-black dark:text-white `}>
                  <div className="grid gap-2">
                    <h3 className="font-bold border dark:border-white border-black rounded-md px-2  uppercase">Set {i + 1}</h3>
                    <div className="px-2">
                      <h5 className="text-sm font-light">{weight && reps ? `${weight} lbs X ${reps} reps` : weight ? `${weight} lbs` : reps ? `${reps} reps` : ''}</h5>
                      <h5 className="text-sm font-light">{intensity} RPE</h5>
                      <h5 className="text-sm font-light">{toFailure ? 'To Failure' : ''}</h5>
                      {notes && <p className="text-sm italic">{notes}</p>}
                      {tags.length > 0 && <div className="flex flex-wrap gap-2">
                        <h5 className="text-sm font-semibold">Tags:</h5>
                        {tags.map((tag, i) => (
                          <Badge key={`${exercise.id}-set-${i}-tag-${tag}`}> {tag} </Badge>
                        ))}
                      </div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default RenderIfDateLoaded;
