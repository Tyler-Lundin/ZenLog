import { Payload } from "@/types/global";
import { ExerciseEntry } from "@prisma/client";
import { authOptions } from "@server/authOptions";
import { prisma } from "@server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export interface SuccessPayload extends Payload {
  numSets: number;
  numReps: number;
  avgWeight: number;
  totalVolume: number;
  latestExercise: ExerciseEntry;
}

export interface ErrorPayload extends Payload {
  error: string;
  errorCode: number;
  errorDetails?: any;
}

export type EntriesExercisePostReturn = SuccessPayload | ErrorPayload;

export async function GET(req: Request, res: any) {
  const { searchParams } = new URL(req.url);
  const userActivityId = searchParams.get('userActivityId');
  if (!userActivityId) return NextResponse.json({ success: false, statusCode: 400, error: "No userActivityId provided" });
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
  const { user: { id: userId } } = session;

  const exerciseEntries = await prisma.exerciseEntry.findMany({
    where: {
      userActivityId,
      userId,
    }
  });

  if (!exerciseEntries) return NextResponse.json({ error: "No entries found" });
  return NextResponse.json({ exerciseEntries });
}

export async function POST(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const userActivityId = searchParams.get('userActivityId');
  if (!userActivityId) return NextResponse.json({ success: false, statusCode: 400, error: "No userActivityId provided" }, { status: 400 });

  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res?.headers?.get(name),
      setHeader: (name: string, value: string) => res?.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  );

  if (!session) return NextResponse.json({ success: false, statusCode: 401, error: "Not Authorized" }, { status: 401 });
  const { user: { id } } = session;

  const exerciseEntries = await prisma.exerciseEntry.findMany({
    where: {
      userActivityId: userActivityId || '',
      userId: id || ''
    }
  })

  if (!exerciseEntries || exerciseEntries.length === 0) return NextResponse.json({ success: false, statusCode: 404, error: "No entries found" }, { status: 404 });

  // Compute statistics
  const numSets = exerciseEntries.length;
  const numReps = exerciseEntries.reduce((sum, entry) => sum + entry.set.reps, 0);
  const totalVolume = exerciseEntries.reduce((sum, entry) => sum + (entry.set.reps * entry.set.weight), 0);
  const avgWeight = totalVolume / numReps;
  const latestExercise = exerciseEntries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

  return NextResponse.json({
    success: true,
    statusCode: 200,
    numSets,
    numReps,
    avgWeight,
    totalVolume,
    latestExercise
  }, {
    status: 200
  });
}

