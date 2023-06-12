import Link from 'next/link'
import Logo from './Logo'
import { buttonVariants } from './ui/button'



export default async function Hero() {
  return (
    <>
      <div className="shadow-black shadow-md absolute text-center left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 grid items-center justify-center p-8 w-72 h-72 rounded-lg border-black dark:border-white border backdrop-blur-md   bg-white/70 dark:bg-black/70 dark:text-white hover:shadow-lg hover:shadow-black transition-all">
        <span className="justify-self-center">
          <Logo />
        </span>
        <Link className={buttonVariants({ variant: 'default' })} href={"/auth/signin"} >Sign In</Link>
        <Link className={buttonVariants({ variant: 'default' })} href={"/learn"}>Learn More</Link>
      </div>
    </>
  )
}
