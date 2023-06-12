'use client';
import Logo from "../Logo"
import DateBlock from "../dashboard/DateBlock";
import NavigationLinks from "./NavigationLinks"
import useUiState from "@/hooks/useUiState";

export default function NavigationBar() {
  const { isNavigationOpen: isOpen } = useUiState();

  return (
    <nav className={`${!isOpen ? 'border-gray-500' : 'border-transparent'} transition-all border-b flex justify-between p-4 w-screen h-16 bg-white dark:bg-black fixed top-0 left-0 z-50`}>
      <Logo />
      <div className="absolute left-1/2 top-3 -translate-x-1/2">
        <DateBlock />
      </div>
      <div className="justify-center items-center h-full">
        <NavigationLinks />
      </div>
    </nav>
  )
}


