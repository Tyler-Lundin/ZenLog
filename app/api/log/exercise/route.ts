import { authOptions } from "@/server/authOptions";
import { prisma } from "@/server/db";
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
    const { exerciseId, reps, weight, date: { month, day, year } } = await req.json();


    if (!exerciseId) return NextResponse.json({ error: "Missing exerciseId" });
    if (reps < 0) return NextResponse.json({ error: "Invalid Rep Count" });
    if (!month) return NextResponse.json({ error: "Missing month" });
    if (!day) return NextResponse.json({ error: "Missing day" });
    if (!year) return NextResponse.json({ error: "Missing year" });



    const exerciseEntry = await prisma.exerciseEntry.create({
      data: {
        userId: id,
        exerciseId: exerciseId,
        reps: +reps,
        weight: +weight,
      }
    });


    const userDate = await prisma.date.findFirst({
      where: {
        userId: id,
        month: +month,
        day: +day,
        year: +year,
      }
    });
    console.log('checked for user date')

    if (!userDate) {
      await prisma.date.create({
        data: {
          userId: id,
          month: +month,
          day: +day,
          year: +year,
          ExerciseEntries: [exerciseEntry.id]
        }
      });
      console.log('created user date instead')
    }

    console.log('adding exercise entry to user date')

    return NextResponse.json({ status: "ok", exerciseEntry });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Error Logging Exercise !" });
  }

}
