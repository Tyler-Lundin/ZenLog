import { authOptions } from "@/server/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


const useServerSession = async (req: Request, res: Response) => {
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  )
  if (!session) return null;
  return session;
}

export default useServerSession;
