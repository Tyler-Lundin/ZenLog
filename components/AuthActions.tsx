'use client';
import { signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { GoSignOut } from 'react-icons/go';
import { useState } from 'react';

export const SignInWithGithub = () => {
  const [disabled, setDisabled] = useState(false);
  const handleClick = () => {
    setDisabled(true);
    signIn('github', { callbackUrl: '/dashboard' });
  }
  return (
    <Button onClick={handleClick} disabled={disabled}> <BsGithub /> Sign in with Github </Button>
  )
}


export const SignInWithGoogle = () => {
  const [disabled, setDisabled] = useState(false);
  const handleClick = () => {
    setDisabled(true);
    // signIn('google', { callbackUrl: '/dashboard' });
    signIn('google');
  }

  return (
    <Button onClick={handleClick} disabled={disabled}> <BsGoogle /> Sign in with Google </Button>
  )
}

export const SignOut = () => (
  <Button className="w-full uppercase" onClick={() => signOut({ callbackUrl: '/' })}><GoSignOut /> Sign out</Button>
) 
