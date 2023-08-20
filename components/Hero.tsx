"use client"
import Link from 'next/link'
import Logo from './Logo'
import { buttonVariants } from './ui/button'
import { Github } from 'lucide-react'



export default function Hero() {
  return (
    <div className="absolute text-center left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 grid items-center justify-center p-8 w-full md:w-96 h-72 rounded-lg   z-20  dark:text-white  transition-all border border-black/25 backdrop-blur-[1px] dark:border-white/25">
      <span className="justify-self-center">
        <Logo isCollapsible={false} />
      </span>
      <Link className={buttonVariants({ variant: 'default', size: "xl" }) + " whitespace-nowrap"} href={"/auth/signin"} >Sign In</Link>
      <Link className={buttonVariants({ variant: 'default', size: "xl" })} href={"/learn"}>Learn More</Link>
      <Link target='_blank' href={"https://github.com/tyler-lundin/zenlog"} className={buttonVariants({ variant: 'default', size: "xl" }) + " whitespace-nowrap"}>
        <Github size={24} />
        View Repo
      </Link>
    </div>
  )
}
