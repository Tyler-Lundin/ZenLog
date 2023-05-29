import { authOptions } from "@/server/authOptions";
import { prisma } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { user: { id } } = session;
    const { exerciseId, reps, weight, date: { month, day, year } } = req.body;

    if (!exerciseId || !reps || !weight || !month || !day || !year) {
      return NextResponse.json({ error: "Missing required fields" });
    }

    const usersDate = await prisma.date.findFirst({
      where: {
        userId: id,
        month,
        day,
        year
      }
    });

    if (!usersDate) {
      const newDate = await prisma.date.create({
        data: {
          day: day as number,
          month: month as number,
          year: year as number,
          userId: id,
          ExerciseEntries: {
          }

        }



      }
