'use client';
import useDashboardData from "@/hooks/useDashboardData";


export default function DashboardStats() {
  const { sleep, weight, mood, exercise } = useDashboardData();

  const STATS = [
    {
      title: "EXERCISE",
      stats: [
        {
          title: "Total Reps",
          value: exercise.totalReps || 0,
          abbreviation: "reps"
        },
        {
          title: "Total Weight",
          value: exercise.totalWeight || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Volume",
          value: exercise.totalVolume || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Entries",
          value: exercise.totalExercises || 0,
          abbreviation: exercise.totalExercises > 1 || exercise.totalExercises === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "SLEEP",
      stats: [
        {
          title: "Total Hours",
          value: sleep.totalHours || 0,
          abbreviation: "hrs"
        },
        {
          title: "Total Entries",
          value: sleep.sleepEntries || 0,
          abbreviation: sleep.sleepEntries > 1 || sleep.sleepEntries === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "MOOD",
      stats: [
        {
          title: "Latest Mood",
          value: mood.mostRecentMood || 'unknown',
        },
        {
          title: "Total Entries",
          value: mood.moodEntries || 0,
          abbreviation: mood.moodEntries > 1 || mood.moodEntries === 0 ? 'entries' : 'entry'
        },
      ]
    },
    {
      title: "BODYWEIGHT",
      stats: [
        {
          title: "Average Weight",
          value: weight.averageWeight || 0,
          abbreviation: "lbs"
        },
        {
          title: "Total Entries",
          value: weight.weightEntries || 0,
          abbreviation: weight.weightEntries > 1 || weight.weightEntries === 0 ? 'entries' : 'entry'
        },
      ]
    }
  ]

  return (
    <div className="bg-white dark:bg-black font-light text-lg dark:text-white px-4 w-full shadow-2xl shadow-white dark:shadow-black py-2">
      {STATS.map((stat, index) => (
        <div key={`${stat.title}-dashboard-stat`} className="mb-4">
          <h2 className="text-2xl lg:text-3xl tracking-widest font-bold">{stat.title}</h2>
          <ul key={index} className="w-full ">
            {stat.stats.map((s, i) => (
              <li key={`${i} ${s.title}`} className=" justify-between w-full flex border-b border-dashed dark:border-white/30 border-black/30">
                <span className="text-xl lg:text-2xl">{s.title}</span>
                <span className="text-xl lg:text-2xl">
                  {s.value} {s.abbreviation && <small className="text-sm">{s.abbreviation}</small>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
