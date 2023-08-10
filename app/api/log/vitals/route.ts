// VITALS ROUTES
import { authOptions } from '@/server/authOptions'
import { prisma } from '@/server/db'
import { PostVitalsRequestBody } from '@/types/global'
import { MoodEntry, SleepEntry, BodyweightEntry } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'


export async function POST(req: Request, res: Response) {
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
      user: { id: userId },
    } = session

    const { bodyweight, mood, sleep, userDayId } = await req.json() as PostVitalsRequestBody

    let bodyweightEntry: BodyweightEntry | undefined = undefined
    let moodEntry: MoodEntry | undefined = undefined
    let sleepEntry: SleepEntry | undefined = undefined

    if (bodyweight !== undefined || bodyweight > 0 || bodyweight < 999) {
      bodyweightEntry = await prisma.bodyweightEntry.create({
        data: {
          weight: bodyweight.value,
          weightUnit: 'POUND',
          userDayId,
          userId,
        },
      })
    }

    if (mood !== undefined || mood !== '') {
      moodEntry = await prisma.moodEntry.create({
        data: {
          mood: mood.value,
          userDayId,
          userId,
        },
      })
    }

    if (sleep !== undefined || sleep > 0) {
      sleepEntry = await prisma.sleepEntry.create({
        data: {
          hours: sleep.value,
          userDayId,
          userId,
        },
      })
    }

    if (!bodyweightEntry && !moodEntry && !sleepEntry)
      return NextResponse.json({ status: 'error', message: 'Could not create entry' })

    const formatData = () => {
      let D = {} as { [key: string]: any }
      if (bodyweightEntry) D.BodyweightEntries = { push: bodyweightEntry.id }
      if (moodEntry) D.MoodEntries = { push: moodEntry.id }
      if (sleepEntry) D.SleepEntries = { push: sleepEntry.id }
      return D
    }
    let data = formatData()

    const userDay = await prisma.userDay.update({
      where: {
        id: userDayId,
      },
      data,
    })

    if (!userDay) return NextResponse.json({ status: 'error', message: 'Could not update date' })

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.error()
  }
}
