'use client';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { buttonVariants } from "../ui/button"
import { AppDispatch } from "@/store/store"
import { toggleLogEventMenu } from "@/store/uiSlice"
import Link from "next/link";
import { cn } from "@/lib/utils";
import BackButton from "../ui/BackButton";
import { setNewExerciseName } from "@/store/appSlice";

const EVENTS = [
  { name: "Exercise", icon: "🏋️" },
  { name: "Food", icon: "🍔" },
  { name: "Water", icon: "🚰" },
  { name: "Journal", icon: "📓" },
]

export default function LogEventMenu() {
  const { isLogEventMenuOpen } = useSelector((state: RootState) => state.ui.dashboard)
  const dispatch = useDispatch<AppDispatch>()
  if (!isLogEventMenuOpen) return null
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white dark:bg-black grid place-content-center">
      <BackButton onClick={() => {
        dispatch(toggleLogEventMenu())
        dispatch(setNewExerciseName(''))
      }}
      />
      <h1 className="text-4xl font-thin mb-4 text-center dark:text-white">What would you like to log?</h1>
      <ul className="flex flex-wrap place-content-center max-w-2xl gap-4 w-full">
        {EVENTS.map((event, i) => (
          <li key={i} className="w-full max-w-xs">
            <Link className={cn(
              buttonVariants({ variant: 'default' }),
              'text-4xl w-full', 'p-8'
            )} href={`/dashboard/${event.name.toLowerCase()}`}> {event.name} {event.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
