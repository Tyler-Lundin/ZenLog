import useServerSession from "@/hooks/useServerSession"
import { prisma } from "@/server/db"
import { NextResponse } from "next/server"




export async function GET(req: Request, res: Response) {
  const session = await useServerSession(req, res);
  if (!session) return NextResponse.json({ error: 'Not Authorized' })
  const { searchParams } = new URL(req.url);
  const dayId = searchParams.get('dayId');
  if (!dayId) {
    return NextResponse.json({ status: 'error', message: 'Missing date id' })
  }
  const { user: { id } } = session;

  const sleep = await prisma.sleepEntry.findMany({
    where: {
      userId: id,
      userDayId: dayId,
    },
    select: {
      hours: true,
    }
  });

  const bodyweight = await prisma.bodyweightEntry.findMany({
    where: {
      userId: id,
      userDayId: dayId,
    },
    select: {
      weight: true,
    }
  });

  const mood = await prisma.moodEntry.findMany({
    where: {
      userId: id,
      userDayId: dayId,
    },
    select: {
      mood: true
    }
  });

  const exercises = await prisma.exerciseEntry.findMany({
    where: {
      userId: id,
      userDayId: dayId,
    },
  })

  const totalReps = exercises.reduce((acc, curr) => acc + curr.set.reps, 0);
  const totalWeight = exercises.reduce((acc, curr) => acc + curr.set.weight, 0);
  const totalHours = sleep.reduce((acc, curr) => acc + curr.hours, 0);
  const averageBodyweight = bodyweight.reduce((acc, curr) => acc + curr.weight, 0) / bodyweight.length;


  return NextResponse.json({
    sleep: { totalHours, sleepEntries: sleep.length },
    weight: { averageBodyweight, bodyweightEntries: bodyweight.length },
    mood: { mostRecentMood: mood[mood.length - 1]?.mood, moodEntries: mood.length },
    exercise: { totalReps, totalWeight, totalExercises: exercises.length, totalVolume: totalReps * totalWeight },
  })


}

