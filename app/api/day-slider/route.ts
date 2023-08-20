import useServerSession from '@/hooks/useServerSession'
import { prisma } from '@server/db'
import { NextResponse } from 'next/server'
import { computeDateMinusX } from '@/lib/utils'
import { UserDay } from '@prisma/client';
import { DateObject } from '@/types/global';

export async function POST(req: Request, res: Response) {
  const session = await useServerSession(req, res);
  if (!session) return NextResponse.json({ error: 'Not Authorized' })


  const { user: { id, email } } = session
  if (!id || !email) return NextResponse.json({ error: 'Not Authorized' })

  const { month, day, year } = await req.json()
  if (!month || !day || !year) {
    return NextResponse.json({ status: 'error', message: 'Missing date' })
  }

  const daysToLoad = 10 // 10 days before and after

  const pastDays: (UserDay | DateObject)[] = Array.from({ length: daysToLoad }, (_, i) => computeDateMinusX(i + 1, +year, +month, +day)).reverse()
  const futureDays: (UserDay | DateObject)[] = Array.from({ length: daysToLoad }, (_, i) => computeDateMinusX(i + 1, +year, +month, +day))

  const userWeek = await prisma.userDay.findMany({
    where: {
      userId: id,
      AND: {
        OR: [
          ...pastDays.map(day => ({ month: day.month, day: day.day, year: day.year })),
          { month: +month, day: +day, year: +year },
          ...futureDays.map(day => ({ month: day.month, day: day.day, year: day.year })),
        ]
      }
    },
  })

  const userWeekInOrder = userWeek.sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1, a.day)
    const dateB = new Date(b.year, b.month - 1, b.day)
    return dateA.getTime() - dateB.getTime()
  })
  if (!userWeek) return NextResponse.json({ error: 'No week found' })

  return NextResponse.json({
    status: 'success',
    message: 'User Week',
    userWeek: userWeekInOrder
  })
}



