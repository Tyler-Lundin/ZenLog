"use client"
import { useSelector } from "react-redux";
import { IoMdSave } from "react-icons/io";
import { RootState } from "@/_store";


export default function SavingScreen() {
  const isSaving = useSelector((state: RootState) => state.ui.isSaving)
  return (
    <div style={{ opacity: isSaving ? 1 : 0, pointerEvents: isSaving ? "all" : "none" }} className=" duration-500 absolute top-0 left-0 dark:bg-black/90 bg-white/90  backdrop-blur-lg grid place-content-center z-50 w-screen h-screen">
      <IoMdSave className="text-white animate-pulse text-6xl" />
    </div>
  )
}
