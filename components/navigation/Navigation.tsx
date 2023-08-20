'use client';
import Logo from "../Logo"
import NavigationLinks from "./NavigationLinks"
import DaySelectorDial from "../dashboard/DaySelectorDial";

export default function Navigation() {
  return (
    <nav className={`transition-all flex justify-between p-4 w-screen h-16  fixed top-0 left-0 z-50 isolate`}>
      <Logo isCollapsible />
      <div className=" bg-white/10 h-16 w-[14.28vw] top-0 left-1/2 -translate-x-1/2 absolute z-50 pointer-events-none" />
      <DaySelectorDial />
      <div className="justify-center items-center h-full">
        <NavigationLinks />
      </div>
    </nav>
  )
}


