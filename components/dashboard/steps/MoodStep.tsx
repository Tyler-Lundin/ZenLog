import { AppDispatch, RootState } from "@/_store"
import { setMood } from "@/_store/slices/dashboardSlice";
import { Button } from "@/components/ui/button";
import { Mood } from "@prisma/client"
import { useDispatch, useSelector } from "react-redux"



export default function MoodStep() {
  const { mood } = useSelector((state: RootState) => state.dashboard.dailyEntries);
  const dispatch = useDispatch<AppDispatch>();

  const MOODS = [
    { name: "Happy", icon: "😀", value: "HAPPY", color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
    { name: "Sad", icon: "😢", value: "SAD", color: "bg-blue-400 dark:bg-blue-600 text-black" },
    { name: "Angry", icon: "😡", value: "ANGRY", color: "bg-red-400 dark:bg-red-600" },
    { name: "Anxious", icon: "😰", value: "ANXIOUS", color: "bg-purple-400 dark:bg-purple-600" },
    { name: "Excited", icon: "😁", value: "EXCITED", color: "bg-orange-400 dark:bg-orange-600" },
    { name: "Neutral", icon: "😐", value: "NEUTRAL", color: "bg-gray-400 dark:bg-gray-600" },
  ]

  return (
    <div className="relative grid justify-center h-fit rounded-lg text-white pt-2 w-full justify-items-center gap-2">
      <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black  xl:col-span-3">MOOD</h1>
      {MOODS.map(M => (
        <Button
          size="2xl"
          className={`w-full grid grid-cols-4 justify-start text-black hover:text-white dark:text-white dark:hover:text-black transition-all rounded-full group overflow-hidden border border-gray-500 ${M.value === mood.value && M.color}`}
          key={M.value}
          onClick={() => dispatch(setMood(M.value as Mood))}
        >
          <p className="text-md lg:text-xl uppercase col-span-3">{M.name}</p>
          <p className={`text-2xl px-2 transition-all group-hover:-translate-y-1/4  ${M.value === mood.value && 'animate-bounce'}`}>{M.icon}</p>
        </Button>
      ))}
    </div>
  )
}
