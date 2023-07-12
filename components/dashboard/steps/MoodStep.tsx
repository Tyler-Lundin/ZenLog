import { AppDispatch, RootState } from "@/_store"
import { setMood } from "@/_store/slices/dashboardSlice";
import { Mood } from "@prisma/client"
import { useDispatch, useSelector } from "react-redux"

export default function MoodStep() {
  const { mood } = useSelector((state: RootState) => state.dashboard.dailyEntries);
  const dispatch = useDispatch<AppDispatch>();

  const MOODS = [
    { name: "Happy", icon: "😀", value: "HAPPY" },
    { name: "Sad", icon: "😢", value: "SAD" },
    { name: "Angry", icon: "😡", value: "ANGRY" },
    { name: "Anxious", icon: "😰", value: "ANXIOUS" },
    { name: "Excited", icon: "😁", value: "EXCITED" },
    { name: "Neutral", icon: "😐", value: "NEUTRAL" },
  ]

  return (
    <>
      <label className="text-center text-xl md:text-2xl font-thin text-black dark:text-white">How are you feeling today?</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center text-black dark:text-white">
        {MOODS.map(M => (
          <button
            className={`w-20 h-20 md:w-32 md:h-32 transition-all rounded-full group ${M.value === mood.value && 'dark:border-white/50 border border-black/50'}`}
            key={M.value}
            onClick={() => dispatch(setMood(M.value as Mood))}
          >
            <p className={`text-2xl md:text-4xl group-hover:animate-bounce  ${M.value === mood.value && 'animate-bounce'}`}>{M.icon}</p>
            <p className="text-md md:text-xl text-black dark:text-white font-black uppercase bg-white dark:bg-black">{M.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}
