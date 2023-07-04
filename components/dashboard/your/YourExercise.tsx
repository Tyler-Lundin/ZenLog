'use client'
import {
  EntriesExercisePostReturn,
  ErrorPayload,
  SuccessPayload,
} from '@/app/api/entries/exercise/route'
import { Spinner } from '@/components/ui/Spinner'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, { method: 'POST' }).then((res) => res.json())

function isSuccessPayload(payload: ErrorPayload | SuccessPayload): payload is SuccessPayload {
  return (payload as SuccessPayload).success !== undefined
}

export default function YourExercise() {
  const { id: userDayId } = useSelector((state: RootState) => state.app.userDay)
  const { data, error, mutate } = useSWR(`/api/entries/exercise?userDayId=${userDayId}`, fetcher)
  const isLoading = !data && !error
  if (isLoading) return <Spinner />
  const typedData = data as EntriesExercisePostReturn
  const success = isSuccessPayload(typedData) ? typedData.success : false

  if (success) {
    const { numSets, numReps, avgWeight, totalVolume, latestExercise } = data
    return (
      <div>
        <h2 className='text-2xl font-bold whitespace-nowrap dark:text-white'>Exercise</h2>
        <div className='grid grid-cols-2 gap-2'>
          <ul>
            <li>Num Sets</li>
            <li>Num Reps</li>
            <li>Avg Weight</li>
            <li>Total Volume</li>
            <li>Latest Exercise</li>
          </ul>
          <ul>
            <li>{numSets}</li>
            <li>{numReps}</li>
            <li>{avgWeight}</li>
            <li>{totalVolume}</li>
            <li>{latestExercise.exerciseName}</li>
          </ul>
        </div>
      </div>
    )
  } else {
    console.log('error', error)
    return (
      <div className='flex gap-4'>
        <h2 className='text-2xl font-bold whitespace-nowrap dark:text-white'>Exercise</h2>
        <h2 className='text-2xl font-bold whitespace-nowrap dark:text-white'>No Data</h2>
      </div>
    )
  }
}
