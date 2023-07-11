import { SignInWithGithub, SignInWithGoogle } from "@/components/AuthActions";
import Page from "@/components/Page";

export default function SignInPage() {

  return (
    <Page>
      <div className="shadow-black shadow-md absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid items-center justify-center p-8 w-72 h-72 rounded-lg border-black dark:border-white border backdrop-blur-md hover:scale-105  bg-white/70 dark:bg-black/70 dark:text-white hover:shadow-lg hover:shadow-black transition-all z-50">
        <h1 className="text-4xl font-black ">Sign In</h1>
        <SignInWithGithub />
        <SignInWithGoogle />
      </div>
    </Page>
  )
}
