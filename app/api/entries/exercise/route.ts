import { authOptions } from "@server/authOptions";
import { prisma } from "@server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: any) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  if (!date) return NextResponse.json({ error: "No date id provided" });
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
  const { user: { id } } = session;

  const exerciseEntries = await prisma.exerciseEntry.findMany({
    where: {
      dateId: date as string,
      userId: id
    }
  });

  if (!exerciseEntries) return NextResponse.json({ error: "No entries found" });
  return NextResponse.json({ exerciseEntries });
}


export async function POST(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const dateId = searchParams.get('date');
  if (!dateId) return NextResponse.json({ error: "No date id provided" });

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
  const { user: { id } } = session;

  const exerciseEntries = await prisma.exerciseEntry.findMany({
    where: {
      dateId: dateId || '',
      userId: id || ''
    }
  })

  if (!exerciseEntries) return NextResponse.json({ error: "No entries found" });

  const exerciseStats = await prisma.exerciseEntry.findMany({
    where: {
      dateId: dateId || '',
      userId: id || ''
    }
  })
}
