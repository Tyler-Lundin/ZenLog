'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from '../ui/navigation-menu';
import { BsGear, BsPerson, } from 'react-icons/bs';
import { MdDashboard, } from 'react-icons/md';
import { SignOut } from '../AuthActions';
import { buttonVariants } from '../ui/button';

const UserProfile = () => {
  const { data: session } = useSession();
  const imageSrc = session?.user?.image
  if (!imageSrc) return <div className="w-[45px] h-[45px] animate-pulse rounded-full bg-gray-500 aspect-square" />
  return (
    <Image className="rounded-full" alt="user" src={imageSrc} width={45} height={45} />
  )
}

const LINKS = [
  { href: '/dashboard', label: 'DASHBOARD', icon: <MdDashboard /> },
  { href: '/dashboard/profile', label: 'PROFILE', icon: <BsPerson /> },
  { href: '/dashboard/settings', label: 'SETTINGS', icon: <BsGear /> },
]

export default function NavigationLinks() {
  return (
    <NavigationMenu className="absolute top-3 right-0">
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger className="dark:text-white">
            <UserProfile />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 bg-white dark:bg-black px-4 py-4">
              {LINKS.map(({ href, label, icon }) => (
                <li key={href} className="text-black dark:text-white text-center">
                  <Link href={href} className={`${buttonVariants({ variant: 'default' })} flex gap-1 w-full transition-all duration-300`}>{icon}{label} </Link>
                </li>
              ))}
              <li className="text-center text-sm">
                <SignOut />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}


