'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsGear, BsPerson, } from 'react-icons/bs';
import { MdDashboard, } from 'react-icons/md';
import { SignOut } from '../AuthActions';
import { buttonVariants } from '../ui/button';

const UserImage = ({ onClick }: { onClick: () => void }) => {
  const { data: session } = useSession();
  const imageSrc = session?.user?.image
  if (!imageSrc) return <div className="w-[30px] h-[30px] animate-pulse rounded-full bg-gray-500 aspect-square" />
  return (
    <Image onClick={onClick} className="rounded-full border" alt="user" src={imageSrc} width={35} height={35} />
  )
}

const LINKS = [
  { href: '/dashboard', label: 'DASHBOARD', icon: <MdDashboard /> },
  { href: '/dashboard/profile', label: 'PROFILE', icon: <BsPerson /> },
  { href: '/dashboard/settings', label: 'SETTINGS', icon: <BsGear /> },
]

export default function NavigationLinks() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <UserImage onClick={() => setIsOpen((_ => !_))} />
      <ul
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
        className="flex flex-col gap-8 bg-white dark:bg-black px-4 py-4 fixed -z-50 top-16 h-[calc(100vh_-_4rem)] left-0 w-screen transition-all ease-in-out duration-300">
        {LINKS.map(({ href, label, icon }) => (
          <li key={href} className="text-2xl text-black dark:text-white text-center">
            <Link href={href} className={`${buttonVariants({ variant: 'default', size: "3xl" })} font-black flex gap-1 w-full transition-all duration-300`}>{icon}{label} </Link>
          </li>
        ))}
        <li className="text-center text-sm">
          <SignOut />
        </li>
      </ul>
    </div>
  )
}


