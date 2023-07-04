'use client';
import NavigationLinks from "./NavigationLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function NavigationDrawer() {
  const { isNavigationOpen } = useSelector((state: RootState) => state.ui)
  return (
    <aside className={`${isNavigationOpen ? '-translate-y-0 mt-16' : '-translate-y-full'} transition-all duration-500 md:hidden bg-white/50 dark:bg-black/50 backdrop-blur-md w-screen h-[calc(100vh_-_4rem)] absolute z-[49] top-0 left-0`}>
      <div className="p-4 h-full">
        <NavigationLinks />
      </div>
    </aside>
  )
}
