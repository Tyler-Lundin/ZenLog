'use client';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Button, buttonVariants } from "../ui/button"
import { AppDispatch } from "@/store/store"
import { toggleLogEventMenu } from "@/store/uiSlice"
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

// enum iEVENTS {
//   EXERCISE,
//   FOOD,
//   WATER,
//   SLEEP,
//   JOURNAL,
//   MOOD,
//   MEDITATE,
// }

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
      <Button variant="destructive" onClick={() => dispatch(toggleLogEventMenu())} className="top-4 p-2 aspect-square right-4 absolute"><AiOutlineClose /></Button>
      <ul className="grid gap-4">
        {EVENTS.map((event, i) => (
          <li key={i} className="bg-black hover:scale-110 transition-all dark:bg-white w-60 rounded-lg">
            <Link onClick={() => dispatch(toggleLogEventMenu())} className="text-2xl uppercase font-black text-white dark:text-black w-full h-full px-4 py-2" href={`/dashboard/${event.name.toLowerCase()}`}> {event.name} {event.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
