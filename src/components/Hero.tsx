import Link from 'next/link'
import Logo from './Logo'
import { Button, buttonVariants } from './ui/button'
import Image from 'next/image'



export default async function Hero() {
  const randomImg = Math.floor(Math.random() * 10) + 1;
  return (
    <>
      <div className="shadow-black shadow-md absolute text-center left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 grid items-center justify-center p-8 w-72 md:w-96 h-72 rounded-lg border-black dark:border-gray-500 border backdrop-blur-md  z-20 bg-white/70 dark:bg-black/70 dark:text-white hover:shadow-lg hover:shadow-black transition-all">
        <span className="justify-self-center">
          <Logo />
        </span>
        <Link className={buttonVariants({ variant: 'default', size: "xl" })} href={"/auth/signin"} >Sign In</Link>
        <Link className={buttonVariants({ variant: 'default', })} href={"/learn"}>Learn More</Link>
        <div className="text-xs text-gray-500 dark:text-gray-400">© 2023 <a className="" target="_blank" href="https://tylerlundin.me">Tyler Lundin</a></div>
      </div>
      <Image priority src={`/images/${randomImg}.jpg`} fill className="absolute opacity-70 top-0 left-0 w-full h-full object-cover" alt="hero background" />
    </>
  )
}
