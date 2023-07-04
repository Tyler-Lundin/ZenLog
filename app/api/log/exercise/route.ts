// import { ExerciseSet } from "@prisma/client";
import { ExerciseEntry } from '@prisma/client'
import { authOptions } from '@server/authOptions'
import { prisma } from '@server/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
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
  data: Omit<ExerciseEntry, 'userId' | 'updatedAt' | 'createdAt' | 'id'>
) => {
  const { exerciseId, exerciseName, set, userDayId } = data

  // Basic field validation
  if (!exerciseId) throw new Error('Missing exerciseId')
  if (!exerciseName) throw new Error('Missing exerciseName')
  if (!set) throw new Error('Missing set')
  if (!userDayId) throw new Error('Missing userDayId')
  if (typeof exerciseId !== 'string') throw new Error('Invalid exerciseId')
  if (typeof exerciseName !== 'string') throw new Error('Invalid exerciseName')

  // Validate set

  ;['reps', 'weight', 'intensity'].forEach((field) => {
    convertToNumber(set, field as ExerciseNumericField)
  })

  if (
    typeof set.toFailure !== 'boolean' ||
    (set.notes && typeof set.notes !== 'string') ||
    !Array.isArray(set.tags)
  ) {
    throw new Error(`Invalid set`)
  }

  set.tags.forEach((tag, j) => {
    if (tag && typeof tag !== 'string') throw new Error(`Invalid tag at index ${j} in set`)
  })
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(
      req as unknown as NextApiRequest,
      {
        ...res,
        getHeader: (name: string) => res.headers?.get(name),
        setHeader: (name: string, value: string) => res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      authOptions
    )

    if (!session) return NextResponse.json({ error: 'Not Authorized' })

    const {
      user: { id },
    } = session
    const { newExercise, userDayId } = await req.json()
    const { exerciseId, exerciseName, set } = newExercise as Omit<
      ExerciseEntry,
      'userId' | 'updatedAt' | 'createdAt' | 'userDayId'
    >
    console.log({ exerciseId, exerciseName, set, userDayId })

    validateRequestData({ exerciseId, exerciseName, set, userDayId })

    const validateDate = await prisma.date.findUnique({
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
          reps: set.reps,
          weight: set.weight,
          intensity: set.intensity,
          toFailure: set.toFailure,
          notes: set.notes || '',
          tags: set.tags || [],
        },
        userDayId,
        userId: id,
      },
    })

    await prisma.date.update({
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
    console.error(error)
    return NextResponse.json({ error: error.message || 'Something went wrong' })
  }
}
