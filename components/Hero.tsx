import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Logo from './Logo'



export default async function Hero() {
  return (
    <>
      <div className="shadow-black shadow-md absolute text-center left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 grid items-center justify-center p-8 w-72 h-72 rounded-lg border-black dark:border-white border backdrop-blur-md hover:scale-105  bg-white/70 dark:bg-black/70 dark:text-white hover:shadow-lg hover:shadow-black transition-all">
        <Logo />
        <Link className={` ${buttonVariants({ variant: 'ghost' })} transition-all text-xl font-thin text-white dark:text-black bg-black dark:bg-white hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent hover:border-black dark:hover:border-white border`} href={"/auth/signin"} >Sign In</Link>
        <Link className={` ${buttonVariants({ variant: 'ghost' })} transition-all text-xl font-thin text-white dark:text-black bg-black dark:bg-white hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent hover:border-black dark:hover:border-white border`} href={"/learn"}>Learn More</Link>
      </div>
    </>
  )
}
