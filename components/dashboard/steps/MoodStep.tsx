import { AppDispatch, RootState } from "@/_store"
import { setMood } from "@/_store/slices/dashboardSlice";
import { Mood } from "@prisma/client"
import { useDispatch, useSelector } from "react-redux"
import { Dosis } from "next/font/google";
const dosis = Dosis({ subsets: ['latin'] });

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
      <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black">MOOD</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center text-black dark:text-white px-10 mt-6">
        {MOODS.map(M => (
          <button
            style={dosis.style}
            className={`w-20 h-20 lg:w-32 lg:h-32 transition-all rounded-full group bg-black/10 overflow-hidden ${M.value === mood.value && 'dark:border-white/50 border border-black/50'}`}
            key={M.value}
            onClick={() => dispatch(setMood(M.value as Mood))}
          >
            <p style={dosis.style} className={`text-2xl lg:text-4xl group-hover:animate-bounce  ${M.value === mood.value && 'animate-bounce'}`}>{M.icon}</p>
            <p style={dosis.style} className="text-md lg:text-xl dark:text-black text-white uppercase dark:bg-white bg-black">{M.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}
