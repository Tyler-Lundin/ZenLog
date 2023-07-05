'use client'
import { ExerciseEntry as IExerciseEntry } from '@prisma/client'
import DashboardBlock from '../dashboard/DashboardBlock'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import useSWR from 'swr'
import { useEffect } from 'react'
import { setExerciseEntries } from '@/store/appSlice'
import { Spinner } from '@/components/ui/Spinner'
import ExerciseEntry from './ExerciseEntry'
import useExerciseEntries from '@/hooks/useExerciseEntries'

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const sortEntries = (entries: IExerciseEntry[]): IExerciseEntry[] => {
  const copyEntries = [...entries]
  return copyEntries.sort((a, b) => {
    return (
      new Date(b.createdAt as unknown as string).getTime() -
      new Date(a.createdAt as unknown as string).getTime()
    )
  })
}

const RenderIfDateLoaded = () => {
  const { id: userDayId } = useSelector((state: RootState) => state.app.userDay)
  if (!userDayId) return null
  return <ExerciseEntries />
}


function ExerciseEntries() {

  const { exerciseEntries } = useExerciseEntries();
  const sorted = sortEntries(exerciseEntries)

  return (
    <>
      <ul className='flex flex-wrap w-full gap-4 '>
        {Array.isArray(exerciseEntries) &&
          exerciseEntries.map((exercise: IExerciseEntry) => (
            <ExerciseEntry key={exercise.id} exercise={exercise} />
          ))}
      </ul>
    </>
  )
}

export default RenderIfDateLoaded
