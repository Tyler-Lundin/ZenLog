import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(req: Request) {
  const exercises = await prisma.exercise.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(exercises);

}
