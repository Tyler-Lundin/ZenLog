'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from '../ui/navigation-menu';
import { BsBell, } from 'react-icons/bs';
import { SignOut } from '../AuthActions';
import { buttonVariants } from '../ui/button';

const UserProfile = () => {
  const { data: session } = useSession();
  const imageSrc = session?.user?.image
  if (!imageSrc) return <div className="w-[45px] h-[45px] animate-pulse rounded-full bg-gray-500 aspect-square" />
  return (
    <Link href={'/dashboard/profile'}>
      <Image className="rounded-full" alt="user" src={imageSrc} width={45} height={45} />
    </Link>
  )
}

// const UserNotifications = () => {
//   const numNotifications = 2;
//   return (
//     <div className="flex flex-row group items-center justify-center relative mr-4 cursor-pointer">
//       <BsBell className="text-3xl group-hover:opacity-80 transition-all" />
//       <div className="absolute group-hover:scale-110 transition-all -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-md">{numNotifications}</div>
//     </div>
//   )
// }

const LINKS = [
  { href: '/dashboard/users', label: 'USERS' },
  { href: '/dashboard/settings', label: 'SETTINGS' },
]

export default function NavigationLinks() {
  return (
    <NavigationMenu className="absolute top-3 right-0">
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger>
            <UserProfile />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 bg-white dark:bg-black px-4 py-4">
              {LINKS.map(({ href, label }) => (
                <li key={href} className="text-black dark:text-white text-xl md:text-md text-center">
                  <Link href={href} className={`${buttonVariants({ variant: 'ghost' })} transition-all duration-300`}>{label}</Link>
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


