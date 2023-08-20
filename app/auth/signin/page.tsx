import { SignInWithGithub, SignInWithGoogle } from "@/components/AuthActions";
import Page from "@/components/Page";

export default function SignInPage() {
  return (
    <Page>
      <div className="absolute text-center left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 grid items-center justify-center p-8 w-full md:w-96 h-72 rounded-lg   z-20  dark:text-white  transition-all border border-black/25 backdrop-blur-[1px] dark:border-white/25">
        <h1 className="text-4xl font-black ">Sign In</h1>
        <SignInWithGithub />
        <SignInWithGoogle />
      </div>
    </Page>
  )
}
