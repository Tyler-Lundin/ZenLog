"use client"
import { GiYinYang } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/_store";

export default function LoadingScreen() {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading)

  return (
    <div style={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? "all" : "none" }} className=" duration-500 absolute top-0 left-0 dark:bg-black/90 bg-white/90  backdrop-blur-lg grid place-content-center z-50 w-screen h-screen">
      <GiYinYang className="text-white text-6xl animate-pulse" />
    </div>
  )
}
