import useServerSession from '@/hooks/useServerSession'
import { Mood } from '@prisma/client';
import { prisma } from '@server/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
  const session = await useServerSession(req, res);
  if (!session) return NextResponse.json({ error: 'Not Authorized' })

  const { month, day, year } = await req.json()
  if (!month || !day || !year) {
    return NextResponse.json({ status: 'error', message: 'Missing date' })
  }

  const { user: { id, email } } = session
  if (!id || !email) return NextResponse.json({ error: 'Not Authorized' })

  const userDay = await prisma.userDay.findFirst({
    where: { userId: id, month: +month, day: +day, year: +year, },
  })

  if (!userDay) {
    const createduserDay = await prisma.userDay.create({
      data: { month: +month, day: +day, year: +year, user: { connect: { id: id, }, }, },
    })

    return NextResponse.json(
      {
        userDay: createduserDay,
        vitals: {
          bodyweight: false,
          mood: false,
          sleep: false,
        },
      },
      { status: 201 }
    )
  }

  const isBodyweightDone = Array.isArray(userDay.BodyweightEntries) && userDay.BodyweightEntries.length > 0
  const isMoodDone = Array.isArray(userDay.MoodEntries) && userDay.MoodEntries.length > 0
  const isSleepDone = Array.isArray(userDay.SleepEntries) && userDay.SleepEntries.length > 0

  let bodyweight = { value: 0, isDone: false }
  let mood = { value: Mood.CALM as Mood, isDone: false }
  let sleep = { value: 0, isDone: false }

  if (isBodyweightDone) {
    const prevBodyweightEntry = await prisma.bodyweightEntry.findUnique({
      where: { id: userDay.BodyweightEntries.at(-1) },
    })
    if (prevBodyweightEntry) bodyweight = { value: prevBodyweightEntry.weight, isDone: true }
  }

  if (isMoodDone) {
    const prevMoodEntry = await prisma.moodEntry.findUnique({
      where: { id: userDay.MoodEntries.at(-1) },
    })
    if (prevMoodEntry) mood = { value: prevMoodEntry.mood, isDone: true }
  }

  if (isSleepDone) {
    const prevSleepEntry = await prisma.sleepEntry.findUnique({
      where: { id: userDay.SleepEntries[userDay.SleepEntries.length - 1] },
    })
    if (prevSleepEntry) sleep = { value: prevSleepEntry.hours, isDone: true }
  }


  return NextResponse.json({
    userDay,
    vitals: {
      bodyweight,
      sleep,
      mood,
    },
  }, { status: 200 })
}
