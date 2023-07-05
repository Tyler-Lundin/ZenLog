import { prisma } from "@/server/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {
    const { SleepEntries } = await req.json();

    const sleepEntries = await prisma.sleepEntry.findMany({
      where: {
        id: { in: SleepEntries }
      }
    })

    if (!SleepEntries) return NextResponse.json({ message: "No sleep entries found" });

    if (sleepEntries.length === 0) return NextResponse.json({ message: "No Sleep Entries", sleepEntries: [] });

    return NextResponse.json({ message: "Sleep Entries Found!", sleepEntries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, sleepEntries: [] });
  }
}
