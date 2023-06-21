// Daily Check In

import { authOptions } from "@/server/authOptions";
import { prisma } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    );

    if (!session) return NextResponse.json({ error: "Not Authorized" });
    console.log('found session')

    const { user: { id: userId } } = session;

    const { weight, mood, sleep, dateId } = await req.json();

    if (!weight || !mood || !sleep || !dateId) {
      return NextResponse.json({ status: 'error', message: 'Missing weight, mood, or sleep' });
    }

    const dailyCheck = {
      weight,
      mood,
      sleep,
      dateId
    }

    const weightEntry = await prisma.weightEntry.create({
      data: {
        weight,
        dateId,
        userId,
      }
    });

    const moodEntry = await prisma.moodEntry.create({
      data: {
        mood,
        dateId,
        userId,
      }
    });

    const sleepEntry = await prisma.sleepEntry.create({
      data: {
        hours: sleep,
        dateId,
        userId,
      }
    });

    const date = await prisma.date.update({
      where: {
        id: dateId
      },
      data: {
        WeightEntries: {
          push: moodEntry.id
        },
        MoodEntries: {
          push: weightEntry.id
        },
        SleepEntries: {
          push: sleepEntry.id
        }
      }
    });

    if (!date) return NextResponse.json({ status: 'error', message: 'Could not update date' });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.error();
  }

}
