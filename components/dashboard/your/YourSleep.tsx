'use client';
import { RootState } from '@/store/store';
import { SleepEntry } from '@prisma/client';
import { useSelector } from 'react-redux';
import useSwr from 'swr';

const fetcher = ({ url, SleepEntries }: { url: string, SleepEntries: SleepEntry[] | [] }) => fetch(url, {
  method: 'GET',
  body: JSON.stringify({ SleepEntries }),
}).then((res) => res.json());

export default function YourSleep() {
  const { SleepEntries } = useSelector((state: RootState) => state.app.date.ids)
  const { data, error } = useSwr({ url: `/api/sleep`, SleepEntries }, fetcher);
  const isLoading = !data && !error;

  if (isLoading) return <div>loading...</div>
  const sleepEntries = data?.sleepEntries || [];
  console.log({ SleepEntries, sleepEntries, data })

  if (sleepEntries === undefined || sleepEntries.length === 0 || error) return <h2 className="text-2xl font-bold dark:text-white">Sleep: 0 hrs</h2>
  if (sleepEntries.length === 1) return <h2 className="text-2xl font-bold dark:text-white">Sleep: {sleepEntries[0].hours} hrs</h2>
  if (sleepEntries.length > 1) return (
    <h2 className="text-2xl font-bold dark:text-white">Sleep: {sleepEntries.reduce((total: number, { hours }: SleepEntry) => {
      return total + hours;
    }, 0)} hrs</h2>
  )
}

