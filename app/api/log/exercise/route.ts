import { NewEntry } from '@/_store/slices/exerciseSlice'
import useServerSession from '@/hooks/useServerSession'
import { prisma } from '@server/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await useServerSession(req, res);
    if (!session) return NextResponse.json({ error: 'Not Authorized' })

    const { user: { id } } = session
    const data = await req.json()
    const { newExercise, userDayId } = data
    const { exerciseId, exerciseName, weight, reps, toFailure, intensity, notes, tags } = newExercise as NewEntry

    if ((!exerciseId || exerciseId === undefined) || (!exerciseName || exerciseName === undefined))
      return NextResponse.json({ error: 'Missing Exercise' })
    if (!weight || weight === undefined)
      return NextResponse.json({ error: 'Missing weight' })
    if (!reps || reps === undefined)
      return NextResponse.json({ error: 'Missing reps' })

    if (!userDayId)
      return NextResponse.json({ error: 'Missing userDayId' })

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
          intensity: intensity !== undefined ? intensity : undefined,
          toFailure: toFailure !== undefined ? toFailure : undefined,
          notes: notes || '',
          tags: Array.isArray(tags) ? tags : [],
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
