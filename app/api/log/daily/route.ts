// Daily Check In

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

  const { weight, mood } = await req.json();

  const newDailyCheckIn = {
    weight,
    mood
  }

  if (!weight || !mood) {
    return NextResponse.json({ error: 'Missing weight or mood' }, { status: 400 });
  }

  return NextResponse.json(newDailyCheckIn, { status: 200 });


}
