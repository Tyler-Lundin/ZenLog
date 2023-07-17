const isDevMode = process.env.NODE_ENV === "development";
export const getGithubOptions = (): { clientId: string, clientSecret: string } => {
  const clientId = isDevMode ? process.env.GITHUB_ID_DEV as string : process.env.GITHUB_ID as string;
  const clientSecret = isDevMode ? process.env.GITHUB_SECRET_DEV as string : process.env.GITHUB_SECRET as string;
  if (!clientId || !clientSecret) throw new Error("Missing Production Github ID or Secret")
  return {
    clientId,
    clientSecret,
  }
}

export const getGoogleOptions = (): { clientId: string, clientSecret: string } => {
  const clientId = isDevMode ? process.env.GOOGLE_ID_DEV as string : process.env.GOOGLE_ID as string;
  const clientSecret = isDevMode ? process.env.GOOGLE_SECRET_DEV as string : process.env.GOOGLE_SECRET as string;
  if (!clientId || !clientSecret) throw new Error("Missing Production Google ID or Secret")
  return {
    clientId,
    clientSecret,
  }
}

export const getNextAuthSecret = (): string => {
  const secret = process.env.NEXTAUTH_SECRET as string;
  if (!secret) throw new Error("Missing Production NextAuth Secret")
  return secret;
}
