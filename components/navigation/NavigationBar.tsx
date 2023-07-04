'use client';
import Logo from "../Logo"
import DateBlock from "../dashboard/DateBlock";
import NavigationLinks from "./NavigationLinks"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function NavigationBar() {
  const { isNavigationOpen } = useSelector((state: RootState) => state.ui)

  return (
    <nav className={`${!isNavigationOpen ? 'border-gray-500' : 'border-transparent'} transition-all border-b flex justify-between p-4 w-screen h-16 bg-white/80 dark:bg-black/80 backdrop-blur-sm fixed top-0 left-0 z-50`}>
      <Logo isCollapsible />
      <div className="absolute left-1/2 top-3 -translate-x-1/2">
        <DateBlock />
      </div>
      <div className="justify-center items-center h-full">
        <NavigationLinks />
      </div>
    </nav>
  )
}


