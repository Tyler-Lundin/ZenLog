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
    const { exerciseId, exerciseName, sets, date: { month, day, year } } = await req.json();


    if (!exerciseId) return NextResponse.json({ error: "Missing exercise id" });
    if (!exerciseName) return NextResponse.json({ error: "Missing exercise name" });
    if (!month) return NextResponse.json({ error: "Missing month" });
    if (!day) return NextResponse.json({ error: "Missing day" });
    if (!year) return NextResponse.json({ error: "Missing year" });
    if (!sets) return NextResponse.json({ error: "Missing sets" });
    if (sets.length < 1) return NextResponse.json({ error: "Invalid sets" });



    const exerciseEntry = await prisma.exerciseEntry.create({
      data: {
        userId: id,
        exerciseName: exerciseName,
        exerciseId: exerciseId,
        sets,
      }
    });
    if (!exerciseEntry) return NextResponse.json({ status: 'error', message: 'Error creating exercise entry' });


    const userDate = await prisma.date.findFirst({
      where: {
        userId: id,
        month: +month,
        day: +day,
        year: +year,
      }
    });

    if (!userDate) {
      const createdDate = await prisma.date.create({
        data: {
          userId: id,
          month: +month,
          day: +day,
          year: +year,
          ExerciseEntries: [exerciseEntry.id]
        }
      });
      if (!createdDate) return NextResponse.json({ status: 'error', message: 'Error creating date' });
      return NextResponse.json({ status: 'ok', exerciseEntry });
    }

    await prisma.date.update({
      where: {
        id: userDate.id
      },
      data: {
        ExerciseEntries: {
          push: exerciseEntry.id
        }
      }
    });


    return NextResponse.json({ status: "ok", exerciseEntry });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Error Logging Exercise !" });
  }

}
