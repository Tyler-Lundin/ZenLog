export const getGithubOptions = (): { clientId: string, clientSecret: string } => {
  const clientId = process.env.GITHUB_ID as string;
  const clientSecret = process.env.GITHUB_SECRET as string;
  if (!clientId || !clientSecret) throw new Error("Missing Production Github ID or Secret")
  return {
    clientId,
    clientSecret,
  }
}

export const getGoogleOptions = (): { clientId: string, clientSecret: string } => {
  const clientId = process.env.GOOGLE_ID as string;
  const clientSecret = process.env.GOOGLE_SECRET as string;
  if (!clientId || !clientSecret) throw new Error("Missing Production Google ID or Secret")
  return {
    clientId,
    clientSecret,
  }
}

