'use client';
import Logo from "../Logo"
import NavigationLinks from "./NavigationLinks"
import DateSelector from "../dashboard/DateSelector";

export default function Navigation() {
  return (
    <nav className={`transition-all flex justify-between p-4 w-screen h-16 bg-white/80 dark:bg-black/80 backdrop-blur-sm fixed top-0 left-0 z-50 isolate`}>
      <Logo isCollapsible />
      <div className="absolute left-1/2 top-3 -translate-x-1/2">
        <DateSelector />
      </div>
      <div className="justify-center items-center h-full">
        <NavigationLinks />
      </div>
    </nav>
  )
}


