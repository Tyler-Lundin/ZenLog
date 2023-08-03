import { NewEntry } from '@/_store/slices/exerciseSlice'
import useServerSession from '@/hooks/useServerSession'
import { ExerciseEntry } from '@prisma/client'
import { prisma } from '@server/db'
import { NextRequest, NextResponse } from 'next/server'

export type ExerciseSet = {
  reps: number | string
  weight: number | string
  intensity: number | string
  toFailure: boolean
  notes: string
  tags: string[]
}

type ExerciseNumericField = 'reps' | 'weight' | 'intensity'

const isNumeric = (n: string | number): n is string => {
  return typeof n === 'string' && !isNaN(Number(n))
}

const convertToNumber = (set: ExerciseSet, field: ExerciseNumericField) => {
  const value = set[field]
  if (isNumeric(value)) {
    set[field] = Number(value)
  } else if (typeof value !== 'number') {
    throw new Error(`Invalid ${field} - must be a number`)
  }
}

const validateRequestData = (
  data: { newExercise: NewEntry, userDayId: string }
) => {
  const { newExercise, userDayId } = data
  const { exerciseId, exerciseName, weight, reps, intensity, toFailure } = newExercise

  // Basic field validation
  if (!exerciseId) throw new Error('Missing exerciseId')
  if (!exerciseName) throw new Error('Missing exerciseName')
  if (!weight) throw new Error('Missing weight')
  if (!reps) throw new Error('Missing reps')
  if (!userDayId) throw new Error('Missing userDayId')
  if (typeof exerciseId !== 'string') throw new Error('Invalid exerciseId')
  if (typeof exerciseName !== 'string') throw new Error('Invalid exerciseName')
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await useServerSession(req, res);
    if (!session) return NextResponse.json({ error: 'Not Authorized' })

    const { user: { id } } = session
    const data = await req.json()
    const { newExercise, userDayId } = data
    const { exerciseId, exerciseName, weight, reps, toFailure, intensity, notes, tags } = newExercise as NewEntry

    validateRequestData(data)

    const validateDate = await prisma.userDay.findUnique({
      where: {
        id: userDayId,
      },
    })

    if (!validateDate) throw new Error('Invalid userDayId')

    if (validateDate.userId !== id) throw new Error('Not authorized')

    const loggedExercise = await prisma.exerciseEntry.create({
      data: {
        exerciseId,
        exerciseName,
        set: {
          reps: reps,
          weight: weight,
          weightUnit: 'POUND',
          intensity: intensity,
          toFailure: toFailure,
          notes: notes || '',
          tags: tags || [],
        },
        userDayId,
        userId: id,
      },
    })

    await prisma.userDay.update({
      where: {
        id: userDayId,
      },
      data: {
        ExerciseEntries: {
          push: loggedExercise.id,
        },
      },
    })

    return NextResponse.json({ exerciseEntry: loggedExercise }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' })
  }
}
