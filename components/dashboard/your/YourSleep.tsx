'use client'
import { Spinner } from '@/components/ui/Spinner'
import { RootState } from '@/store/store'
import { SleepEntry } from '@prisma/client'
import { useSelector } from 'react-redux'
import useSwr from 'swr'

const fetcher = ({ url, SleepEntries }: { url: string; SleepEntries: SleepEntry[] | [] }) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ SleepEntries }),
  }).then((res) => res.json())

export default function YourSleep() {
  const { SleepEntries } = useSelector((state: RootState) => state.app.userDay.ids)
  const { data, error } = useSwr({ url: `/api/sleep`, SleepEntries }, fetcher)
  const isLoading = !data && !error

  const sleepEntries = data?.sleepEntries || []
  console.log({ SleepEntries, sleepEntries, data })

  if (sleepEntries === undefined || error || isLoading)
    return (
      <h2 className='text-2xl font-bold dark:text-white flex'>
        Sleep:
        <div className='h-full grid items-center px-2'>
          <Spinner size='xs' />
        </div>
        hrs
      </h2>
    )
  if (sleepEntries.length === 0)
    return <h2 className='text-2xl font-bold dark:text-white'>Sleep: 0 hrs</h2>
  if (sleepEntries.length === 1)
    return (
      <h2 className='text-2xl font-bold dark:text-white'>Sleep: {sleepEntries[0].hours} hrs</h2>
    )
  if (sleepEntries.length > 1)
    return (
      <h2 className='text-2xl font-bold dark:text-white'>
        Sleep:{' '}
        {sleepEntries.reduce((total: number, { hours }: SleepEntry) => {
          return total + hours
        }, 0)}{' '}
        hrs
      </h2>
    )
}
