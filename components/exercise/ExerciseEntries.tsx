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
  const { id: userDayId } = useSelector((state: RootState) => state.app.userDay)
  const dispatch = useDispatch()
  const { isSorted } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const { data, error, mutate } = useSWR(`/api/entries/exercise?userDayId=${userDayId}`, fetcher)
  const isLoading = !data && !error
  const exerciseEntries = useSelector((state: RootState) => state.app.userDay.ExerciseEntries)

  useEffect(() => {
    if (data) dispatch(setExerciseEntries(data.exerciseEntries))
    if (!data) dispatch(setExerciseEntries([]))
  }, [data, dispatch, userDayId])

  useEffect(() => {
    mutate()
  }, [exerciseEntries, mutate])

  if (isLoading || !exerciseEntries)
    return (
      <DashboardBlock>
        <Spinner size='xl' />
      </DashboardBlock>
    )

  if (exerciseEntries.length === 0)
    return (
      <DashboardBlock>
        <p className='text-black dark:text-white'>No exercises logged for this date.</p>
      </DashboardBlock>
    )

  const sorted = sortEntries(exerciseEntries)

  return (
    <>
      <ul className='flex flex-wrap w-full gap-4 '>
        {Array.isArray(exerciseEntries) &&
          (isSorted ? sorted : exerciseEntries).map((exercise: IExerciseEntry) => (
            <ExerciseEntry key={exercise.id} exercise={exercise} />
          ))}
      </ul>
    </>
  )
}

export default RenderIfDateLoaded
