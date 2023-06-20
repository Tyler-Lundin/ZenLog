import { NextResponse } from "next/server";
import { prisma } from "@server/db";

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany();
    return NextResponse.json(exercises);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
