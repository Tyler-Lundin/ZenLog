import useServerSession from "@/hooks/useServerSession"
import { prisma } from "@/server/db"
import { Mood } from "@prisma/client";
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
  const minBodyweight = Math.min(...bodyweight.map(b => b.weight));
  const maxBodyweight = Math.max(...bodyweight.map(b => b.weight));

  // Sleep
  const averageSleep = totalHours / sleep.length;
  const maxSleep = Math.max(...sleep.map(s => s.hours));
  const minSleep = Math.min(...sleep.map(s => s.hours));

  // Mood 

  const moodFrequency: { [mood in Mood]: number } = {
    [Mood.AFFECTION]: 0,
    [Mood.AGITATION]: 0,
    [Mood.AMUSEMENT]: 0,
    [Mood.ANGER]: 0,
    [Mood.ANNOYANCE]: 0,
    [Mood.ANXIETY]: 0,
    [Mood.APATHY]: 0,
    [Mood.AWE]: 0,
    [Mood.BOREDOM]: 0,
    [Mood.CALM]: 0,
    [Mood.CONFUSION]: 0,
    [Mood.CONTEMPT]: 0,
    [Mood.CURIOSITY]: 0,
    [Mood.DEPRESSION]: 0,
    [Mood.DESIRE]: 0,
    [Mood.DESPAIR]: 0,
    [Mood.DISAPPOINTMENT]: 0,
    [Mood.DISGUST]: 0,
    [Mood.DOUBT]: 0,
    [Mood.EAGERNESS]: 0,
    [Mood.EMBARRASSMENT]: 0,
    [Mood.ENVY]: 0,
    [Mood.EXCITEMENT]: 0,
    [Mood.FEAR]: 0,
    [Mood.FRUSTRATION]: 0,
    [Mood.GRATITUDE]: 0,
    [Mood.GRIEF]: 0,
    [Mood.GUILT]: 0,
    [Mood.HAPPINESS]: 0,
    [Mood.HATRED]: 0,
    [Mood.HOPE]: 0,
    [Mood.HOSTILITY]: 0,
    [Mood.HUMILIATION]: 0,
    [Mood.INTEREST]: 0,
    [Mood.JEALOUSY]: 0,
    [Mood.JOY]: 0,
    [Mood.LONELINESS]: 0,
    [Mood.LOVE]: 0,
    [Mood.NERVOUSNESS]: 0,
    [Mood.OPTIMISM]: 0,
    [Mood.OUTRAGE]: 0,
    [Mood.PANIC]: 0,
    [Mood.PASSION]: 0,
    [Mood.PITY]: 0,
    [Mood.PRIDE]: 0,
    [Mood.RELIEF]: 0,
    [Mood.REMORSE]: 0,
    [Mood.RESIGNATION]: 0,
    [Mood.SADNESS]: 0,
    [Mood.SATISFACTION]: 0,
    [Mood.SHAME]: 0,
    [Mood.SHOCK]: 0,
    [Mood.SORROW]: 0,
    [Mood.SURPRISE]: 0,
    [Mood.SYMPATHY]: 0,
    [Mood.TERROR]: 0,
    [Mood.TRUST]: 0,
    [Mood.WONDER]: 0,
    [Mood.WORRY]: 0,
    [Mood.ZEAL]: 0,
  };

  mood.forEach(m => { moodFrequency[m.mood] += 1; })


  // Exercise
  const averageReps = totalReps / exercises.length;
  const averageWeight = totalWeight / exercises.length;
  const maxWeight = Math.max(...exercises.map(e => e.set.weight));
  const minWeight = Math.min(...exercises.map(e => e.set.weight));

  return NextResponse.json({
    sleep: {
      totalHours,
      averageSleep,
      maxSleep,
      minSleep,
      sleepEntries: sleep.length
    },
    bodyweight: {
      averageBodyweight,
      bodyweightEntries: bodyweight.length,
      minBodyweight,
      maxBodyweight
    },
    mood: {
      mostRecentMood: mood[mood.length - 1]?.mood,
      moodEntries: mood.length,
      moodFrequency
    },
    exercise: {
      totalReps,
      averageReps,
      totalWeight,
      averageWeight,
      maxWeight,
      minWeight,
      totalExercises: exercises.length,
      totalVolume: totalReps * totalWeight
    }
  }
  )
}

