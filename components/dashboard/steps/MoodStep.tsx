import { Mood } from "@prisma/client"
import { useState } from "react"

export default function MoodStep() {
  const [mood, setMood] = useState<Mood>("HAPPY")

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
      <label className="text-center  text-2xl font-thin">How are you feeling today?</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-4 justify-items-center">
        {MOODS.map(mood => (
          <button className={`w-32 h-32 transition-all rounded-full ${isMoodSelected(mood.value as Mood) && 'dark:border-white border-2 border-black'}`} key={mood.value} onClick={() => setMood(mood.value as Mood)}>
            <p className={`text-4xl ${isMoodSelected(mood.value as Mood) && 'animate-bounce'}`}>{mood.icon}</p>
            <p className="text-xl text-black dark:text-white font-black uppercase">{mood.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}
