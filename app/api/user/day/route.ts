import useServerSession from '@/hooks/useServerSession'
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
        dailyEntriesStatus: {
          bodyweight: false,
          mood: false,
          sleep: false,
        },
      },
      { status: 201 }
    )
  }

  const isBodyweightDone = Array.isArray(userDay.WeightEntries) && userDay.WeightEntries.length > 0
  const isMoodDone = Array.isArray(userDay.MoodEntries) && userDay.MoodEntries.length > 0
  const isSleepDone = Array.isArray(userDay.SleepEntries) && userDay.SleepEntries.length > 0

  return NextResponse.json({
    userDay, dailyEntriesStatus: {
      bodyweight: isBodyweightDone,
      mood: isMoodDone,
      sleep: isSleepDone,
    }
  }, { status: 200 })
}
