import { NextResponse } from "next/server";


export function POST(req: Request, res: Response) {
  return NextResponse.json({ status: "ok" })
}

export function GET(req: Request, res: Response) {
  return NextResponse.json({ status: "ok" })
}
