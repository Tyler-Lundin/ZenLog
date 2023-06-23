// import { ExerciseSet } from "@prisma/client";
import { ExerciseEntry } from "@prisma/client";
import { authOptions } from "@server/authOptions";
import { prisma } from "@server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export type ExerciseSet = {
  reps: number | string;
  weight: number | string;
  intensity: number | string;
  toFailure: boolean;
  notes: string;
  tags: string[];
}


type ExerciseNumericField = 'reps' | 'weight' | 'intensity';

const isNumeric = (n: string | number): n is string => {
  return typeof n === 'string' && !isNaN(Number(n));
}

const convertToNumber = (set: ExerciseSet, field: ExerciseNumericField) => {
  const value = set[field];
  if (isNumeric(value)) {
    set[field] = Number(value);
  } else if (typeof value !== 'number') {
    throw new Error(`Invalid ${field} - must be a number`);
  }
}

const validateRequestData = (data: Omit<ExerciseEntry, "userId" | "updatedAt" | "createdAt" | "id">) => {
  const { exerciseId, exerciseName, sets, dateId } = data;

  // Basic field validation
  if (!exerciseId || !exerciseName || !sets || !dateId) throw new Error("Missing required fields");
  if (typeof exerciseId !== 'string') throw new Error("Invalid exerciseId");
  if (typeof exerciseName !== 'string') throw new Error("Invalid exerciseName");

  // Validate sets
  if (!Array.isArray(sets) || sets.length < 1 || sets.length > 6) throw new Error("Invalid sets - must be an array of 1-6 items");

  sets.forEach((set, i) => {
    // Check if reps, weight and intensity are numeric strings and convert them to numbers
    ['reps', 'weight', 'intensity'].forEach(field => {
      convertToNumber(set, field as ExerciseNumericField);
    });

    if (typeof set.toFailure !== 'boolean' || (set.notes && typeof set.notes !== 'string') || !Array.isArray(set.tags)) {
      throw new Error(`Invalid set at index ${i}`);
    }

    set.tags.forEach((tag, j) => {
      if (tag && typeof tag !== 'string') throw new Error(`Invalid tag at index ${j} in set ${i}`);
    });
  });
}


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

    const { user: { id } } = session;
    const { newExercise, dateId } = await req.json();
    const { exerciseId, exerciseName, sets } = newExercise as Omit<ExerciseEntry, "userId" | "updatedAt" | "createdAt" | "dateId">;
    console.log({ exerciseId, exerciseName, sets, dateId });

    validateRequestData({ exerciseId, exerciseName, sets, dateId });

    const validateDate = await prisma.date.findUnique({
      where: {
        id: dateId
      }
    });

    if (!validateDate) throw new Error("Invalid dateId");

    if (validateDate.userId !== id) throw new Error("Not authorized");

    const loggedExercise = await prisma.exerciseEntry.create({
      data: {
        exerciseId,
        exerciseName,
        sets,
        dateId,
        userId: id
      }
    });

    await prisma.date.update({
      where: {
        id: dateId
      },
      data: {
        ExerciseEntries: {
          push: loggedExercise.id
        }
      }
    });

    return NextResponse.json({ exerciseEntry: loggedExercise }, { status: 201 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Something went wrong" });
  }
}
