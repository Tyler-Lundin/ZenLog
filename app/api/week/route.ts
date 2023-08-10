import useServerSession from '@/hooks/useServerSession'
import { prisma } from '@server/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
  const session = await useServerSession(req, res);
  if (!session) return NextResponse.json({ error: 'Not Authorized' })


  const { user: { id, email } } = session
  if (!id || !email) return NextResponse.json({ error: 'Not Authorized' })

  const { month, day, year } = await req.json()
  if (!month || !day || !year) {
    return NextResponse.json({ status: 'error', message: 'Missing date' })
  }

  const selectedDateMinusX = (x: number) => {
    const date = new Date(+year, +month - 1, +day)
    date.setDate(date.getDate() - x)
    return date
  }
  const weekDates = [
    { month: selectedDateMinusX(6).getMonth() + 1, day: selectedDateMinusX(6).getDate(), year: selectedDateMinusX(6).getFullYear() },
    { month: selectedDateMinusX(5).getMonth() + 1, day: selectedDateMinusX(5).getDate(), year: selectedDateMinusX(5).getFullYear() },
    { month: selectedDateMinusX(4).getMonth() + 1, day: selectedDateMinusX(4).getDate(), year: selectedDateMinusX(4).getFullYear() },
    { month: selectedDateMinusX(3).getMonth() + 1, day: selectedDateMinusX(3).getDate(), year: selectedDateMinusX(3).getFullYear() },
    { month: selectedDateMinusX(2).getMonth() + 1, day: selectedDateMinusX(2).getDate(), year: selectedDateMinusX(2).getFullYear() },
    { month: selectedDateMinusX(1).getMonth() + 1, day: selectedDateMinusX(1).getDate(), year: selectedDateMinusX(1).getFullYear() },
    { month: selectedDateMinusX(0).getMonth() + 1, day: selectedDateMinusX(0).getDate(), year: selectedDateMinusX(0).getFullYear() },
  ]

  const userWeek = await prisma.userDay.findMany({
    where: {
      userId: id,
      AND: {
        OR: [
          { month: weekDates[0].month, day: weekDates[0].day, year: weekDates[0].year },
          { month: weekDates[1].month, day: weekDates[1].day, year: weekDates[1].year },
          { month: weekDates[2].month, day: weekDates[2].day, year: weekDates[2].year },
          { month: weekDates[3].month, day: weekDates[3].day, year: weekDates[3].year },
          { month: weekDates[4].month, day: weekDates[4].day, year: weekDates[4].year },
          { month: weekDates[5].month, day: weekDates[5].day, year: weekDates[5].year },
          { month: weekDates[6].month, day: weekDates[6].day, year: weekDates[6].year },
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



