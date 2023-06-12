'use client';
import { signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { BsGithub, BsGoogle } from 'react-icons/bs'

export const SignInWithGithub = () => (
  <Button onClick={() => signIn('github')}> <BsGithub /> Sign in with Github</Button>
)


export const SignInWithGoogle = () => (
  <Button onClick={() => signIn('google')}> <BsGoogle /> Sign in with Google</Button>
)

export const SignOut = () => (
  <Button className="uppercase" variant={'ghost'} onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
) 
