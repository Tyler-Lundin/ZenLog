'use client';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Button, buttonVariants } from "../ui/button"
import { AppDispatch } from "@/store/store"
import { toggleLogEventMenu } from "@/store/uiSlice"
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "@/lib/utils";

const EVENTS = [
  { name: "Exercise", icon: "🏋️" },
  { name: "Food", icon: "🍔" },
  { name: "Water", icon: "🚰" },
  { name: "Sleep", icon: "💤" },
  { name: "Journal", icon: "📓" },
  { name: "Mood", icon: "😊" },
  { name: "Meditate", icon: "🧘" },
]

export default function LogEventMenu() {
  const { isLogEventMenuOpen } = useSelector((state: RootState) => state.ui.dashboard)
  const dispatch = useDispatch<AppDispatch>()
  if (!isLogEventMenuOpen) return null
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-md grid place-content-center">
      <Button variant="destructive" size="lgSquare" onClick={() => dispatch(toggleLogEventMenu())} className="top-4 right-4 absolute"><AiOutlineClose /></Button>
      <ul className="flex flex-wrap place-content-center max-w-2xl gap-4 w-full">
        {EVENTS.map((event, i) => (
          <li key={i} >
            <Link onClick={() => dispatch(toggleLogEventMenu())} className={cn(
              buttonVariants({ variant: 'default' }),
              'text-4xl w-full', 'p-8'
            )} href={`/dashboard/${event.name.toLowerCase()}`}> {event.name} {event.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
