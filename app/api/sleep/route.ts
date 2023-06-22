import { prisma } from "@/server/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

  try {
    console.log("GET /api/sleep/route.ts ~~~~~ ~~ ~ ~  ~ ~~  ~ ~ ~~  ~");
    const { SleepEntries } = await req.json();
    console.log(SleepEntries);

    const sleepEntries = await prisma.sleepEntry.findMany({
      where: {
        id: { in: SleepEntries }
      }
    })
    console.log(sleepEntries);

    if (!SleepEntries) return NextResponse.error();

    if (sleepEntries.length === 0) return NextResponse.json({ sleepEntries: [] });

    return NextResponse.json({ sleepEntries });
  } catch (error: any) {
    return NextResponse.error()
  }
}
