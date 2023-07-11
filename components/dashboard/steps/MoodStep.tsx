import { Button } from "@/components/ui/button";
import { setDailyMood, skipDailyStep } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store"
import { Mood } from "@prisma/client"
import { useDispatch, useSelector } from "react-redux"

export default function MoodStep() {
  const { mood } = useSelector((state: RootState) => state.app.dashboard.dailyCheck);
  const dispatch = useDispatch<AppDispatch>();

  const MOODS = [
    { name: "Happy", icon: "😀", value: "HAPPY" },
    { name: "Sad", icon: "😢", value: "SAD" },
    { name: "Angry", icon: "😡", value: "ANGRY" },
    { name: "Anxious", icon: "😰", value: "ANXIOUS" },
    { name: "Excited", icon: "😁", value: "EXCITED" },
    { name: "Neutral", icon: "😐", value: "NEUTRAL" },
  ]

  const isMoodSelected = (m: Mood) => m === mood

  return (
    <>
      <label className="text-center text-xl md:text-2xl font-thin text-black dark:text-white">How are you feeling today?</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center text-black dark:text-white">
        {MOODS.map(mood => (
          <button
            className={`w-20 h-20 md:w-32 md:h-32 transition-all rounded-full group ${isMoodSelected(mood.value as Mood) && 'dark:border-white/50 border border-black/50'}`}
            key={mood.value}
            onClick={() => dispatch(setDailyMood(mood.value as Mood))}
          >
            <p className={`text-2xl md:text-4xl group-hover:animate-bounce  ${isMoodSelected(mood.value as Mood) && 'animate-bounce'}`}>{mood.icon}</p>
            <p className="text-md md:text-xl text-black dark:text-white font-black uppercase bg-white dark:bg-black">{mood.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}
