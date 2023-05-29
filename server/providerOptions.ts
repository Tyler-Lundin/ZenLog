

const env = process.env.NODE_ENV || "development"
const isDev = env === "development"

export const getGithubOptions = (): { clientId: string, clientSecret: string } => {
  const devID = process.env.GITHUB_ID_DEV as string;
  const devSecret = process.env.GITHUB_SECRET_DEV as string;
  const prodID = process.env.GITHUB_ID as string;
  const prodSecret = process.env.GITHUB_SECRET as string;

  if (!devID || !devSecret && isDev) throw new Error("Missing Development Github ID or Secret")
  if (!prodID || !prodSecret && !isDev) throw new Error("Missing Production Github ID or Secret")
  if (isDev) {
    return {
      clientId: devID,
      clientSecret: devSecret,
    }
  }

  return {
    clientId: prodID,
    clientSecret: prodSecret,
  }
}

export const getGoogleOptions = (): { clientId: string, clientSecret: string } => {

  const devID = process.env.GOOGLE_ID_DEV as string;
  const devSecret = process.env.GOOGLE_SECRET_DEV as string;
  const prodID = process.env.GOOGLE_ID as string;
  const prodSecret = process.env.GOOGLE_SECRET as string;

  if (!devID || !devSecret && isDev) throw new Error("Missing Development Google ID or Secret")
  if (!prodID || !prodSecret && !isDev) throw new Error("Missing Production Google ID or Secret")
  if (isDev) {
    return {
      clientId: devID,
      clientSecret: devSecret,
    }
  }

  return {
    clientId: prodID,
    clientSecret: prodSecret,
  }
}

