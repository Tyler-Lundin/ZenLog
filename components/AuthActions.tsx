'use client';
import { signIn } from 'next-auth/react'
import { Button, buttonVariants } from './ui/button'
import { BsGithub, BsGoogle } from 'react-icons/bs'

export const SignInWithGithub = () => {

  return (
    <Button className={` ${buttonVariants({ variant: 'ghost' })} flex gap-2 transition-all text-md font-thin text-white dark:text-black bg-black dark:bg-white hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent hover:border-black dark:hover:border-white border`} onClick={() => signIn('github')}> <BsGithub /> Sign in with Github</Button>
  )
}


export const SignInWithGoogle = () => {

  return (
    <Button className={` ${buttonVariants({ variant: 'ghost' })} flex gap-2 transition-all text-md font-thin text-white dark:text-black bg-black dark:bg-white hover:bg-transparent dark:hover:text-white dark:hover:bg-transparent hover:border-black dark:hover:border-white border`} onClick={() => signIn('google')}> <BsGoogle /> Sign in with Google</Button>
  )
}
