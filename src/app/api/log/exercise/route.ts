import { authOptions } from "@server/authOptions";
import { prisma } from "@server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
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

    const { user: { id } } = session;
    const { exerciseId, exerciseName, sets, dateId } = await req.json();

    // Basic field validation
    if (!exerciseId || !exerciseName || !sets || !dateId) return NextResponse.json({ error: "Missing required fields" });
    if (typeof exerciseId !== 'string') return NextResponse.json({ error: "Invalid exerciseId" });
    if (typeof exerciseName !== 'string') return NextResponse.json({ error: "Invalid exerciseName" });

    // Validate sets
    if (!Array.isArray(sets) || sets.length < 1 || sets.length > 6) return NextResponse.json({ error: "Invalid sets - must be an array of 1-6 items" });

    for (let i = 0; i < sets.length; i++) {
      const set = sets[i];
      if (typeof set.reps !== 'number' || typeof set.weight !== 'number' || typeof set.intensity !== 'number'
        || typeof set.toFailure !== 'boolean' || typeof set.notes !== 'string' || !Array.isArray(set.tags)) {
        return NextResponse.json({ error: `Invalid set at index ${i}` });
      }

      for (let j = 0; j < set.tags.length; j++) {
        if (typeof set.tags[j] !== 'string') return NextResponse.json({ error: `Invalid tag at index ${j} in set ${i}` });
      }
    }

    const loggedExercise = await prisma.exerciseEntry.create({
      data: {
        exerciseId,
        exerciseName,
        sets,
        dateId,
        userId: id
      }
    });

    return NextResponse.json({ message: "Exercise entry created successfully", data: loggedExercise });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}

