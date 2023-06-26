
'use client';
import { Spinner } from '@/components/ui/Spinner';
import { RootState } from '@/store/store';
import { SleepEntry } from '@prisma/client';
import { useSelector } from 'react-redux';
import useSWR from 'swr';


const fetcher = (url: string) => fetch(url, { method: 'POST' }).then((res) => res.json());

export default function YourExercise() {
  const { id: dateId } = useSelector((state: RootState) => state.app.date)
  const { data, error, mutate } = useSWR(`/api/entries/exercise?date=${dateId}`, fetcher);
  const isLoading = !data && !error;

  const exerciseEntries = data?.exerciseEntries || [];
  console.log({ dateId, exerciseEntries, data })

  if (exerciseEntries === undefined || error || isLoading) return (
    <h2 className="text-2xl font-bold dark:text-white flex">
      Exercise:
      <div className="h-full grid items-center px-2">
        <Spinner size="xs" />
      </div>
    </h2>
  )
  return (
    <>
    </>
  )
}
