import { authOptions } from "@server/authOptions";
import { prisma } from "@server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
  const { month, day, year } = await req.json();

  if (!month || !day || !year) {
    return NextResponse.json({ status: 'error', message: 'Missing date' });
  }

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

  const { user: { id, email } } = session;
  if (!id || !email) return NextResponse.json({ error: "Not Authorized" });

  const userDate = await prisma.userActivity.findFirst({
    where: {
      userId: id,
      month: +month,
      day: +day,
      year: +year,
    }
  });

  if (!userDate) {
    const createdDate = await prisma.userActivity.create({
      data: {
        month: +month,
        day: +day,
        year: +year,
        user: {
          connect: {
            id: id
          }
        }
      }
    });

    return NextResponse.json({
      date: createdDate, dailyCheckIsDone: {
        weight: false,
        mood: false,
        sleep: false,
      }
    }, { status: 201 });
  }

  const isWeightDone = Array.isArray(userDate.WeightEntries) && userDate.WeightEntries.length > 0;
  const isMoodDone = Array.isArray(userDate.MoodEntries) && userDate.MoodEntries.length > 0;
  const isSleepDone = Array.isArray(userDate.SleepEntries) && userDate.SleepEntries.length > 0;

  const isDone = {
    weight: isWeightDone,
    mood: isMoodDone,
    sleep: isSleepDone,
  }

  return NextResponse.json({ date: userDate, dailyCheckIsDone: isDone }, { status: 200 });

}
