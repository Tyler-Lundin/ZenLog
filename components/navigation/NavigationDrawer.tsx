'use client';
import useUiState from "@/hooks/useUiState";
import NavigationLinks from "./NavigationLinks";

export default function NavigationDrawer() {
  const { isNavigationOpen } = useUiState();
  return (
    <aside className={`${isNavigationOpen ? '-translate-y-0 mt-16' : '-translate-y-full'} transition-all duration-500 md:hidden bg-white/50 dark:bg-black/50 backdrop-blur-md w-screen h-[calc(100vh_-_4rem)] absolute z-[49] top-0 left-0`}>
      <div className="p-4 h-full">
        <NavigationLinks />
      </div>
    </aside>
  )
}
