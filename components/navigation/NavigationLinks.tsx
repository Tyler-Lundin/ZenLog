'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const isActiveCN = (pathname: string, href: string): string => {
  if (pathname.startsWith(href)) return 'font-black';
  return 'font-thin hover:font-black';
}

const LINKS = [
  { href: '/profile', label: 'PROFILE' },
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/settings', label: 'SETTINGS' },
  { href: '/auth/signout', label: 'SIGN OUT' },
]

export default function NavigationLinks() {
  const pathname = usePathname();

  return (
    <ul className="grid md:flex gap-6 w-full h-full content-center text-center justify-center items-center">
      {LINKS.map(({ href, label }) => (
        <li key={href} className="text-black dark:text-white text-2xl md:text-md">
          <Link href={href} className={`${isActiveCN(pathname, href)} transition-all duration-300`}>{label}</Link>
        </li>
      ))}
    </ul>

  )
}
