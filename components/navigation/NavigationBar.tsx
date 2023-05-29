'use client';
import Logo from "../Logo"
import NavigationLinks from "./NavigationLinks"
import useUiState from "@/hooks/useUiState";
import ToggleButton from "./ToggleButton";





export default function NavigationBar() {
  const { isNavigationOpen: isOpen } = useUiState();

  return (
    <nav className={`${!isOpen ? 'border-gray-500' : 'border-transparent'} transition-all border-b flex justify-between p-4 w-screen h-16 bg-white/50 dark:bg-black/50 backdrop-blur-md fixed top-0 left-0 z-50`}>
      <Logo />
      <ToggleButton isOpen={isOpen} />
      <div className="hidden md:flex justify-center items-center h-full">
        <NavigationLinks />
      </div>
    </nav>
  )
}


