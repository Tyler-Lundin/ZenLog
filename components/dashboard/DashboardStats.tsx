'use client';
import useDashboardData from "@/hooks/useDashboardData";

// {
//     sleep: { totalHours, sleepEntries: sleep.length },
//     weight: { averageWeight, weightEntries: weight.length },
//     mood: { mostRecentMood: mood[mood.length - 1]?.mood, moodEntries: mood.length },
//     exercise: { totalReps, totalWeight, totalExercises: exercises.length, totalVolume: totalReps * totalWeight },
//   }

export default function DashboardStats() {
  const data = useDashboardData();
  const { sleep, weight, mood, exercise } = data;
  console.log(data);
  return (
    <div>
      <h1 className="bg-gray-200 font-bold text-xl p-4 rounded-t-md border-t border-r border-l border-black dark:border-white">Your Stats</h1>
      <ul className="bg-white dark:bg-black font-light text-lg dark:text-white p-4 rounded-br-md rounded-bl-md border-l border-b border-r border-black dark:border-white">
        <li className="flex justify-between"><span>Exercise Total Reps</span> <span>{exercise.totalReps || 0} <small className="text-sm"> reps</small> </span></li>
        <li className="flex justify-between"><span>Exercise Total Weight</span> <span>{exercise.totalWeight || 0} <small className="text-sm"> lbs</small></span></li>
        <li className="flex justify-between"><span>Exercise Total Volume</span> <span>{exercise.totalVolume || 0} <small className="text-sm"> vol</small></span></li>
        <li className="flex justify-between"><span>Exercise Total Entries</span> <span>{exercise.totalExercises || 0} <small className="text-sm"> ent</small> </span></li>
        <hr className="my-2" />
        <li className="flex justify-between"><span>Sleep Total Hours</span> <span>{sleep.totalHours || 0} <small className="text-sm"> hrs</small> </span></li>
        <li className="flex justify-between"><span>Sleep Total Entries</span> <span>{sleep.sleepEntries || 0}</span></li>
        <hr className="my-2" />
        <li className="flex justify-between"><span>Bodyweight Average</span> <span>{weight.averageWeight || 0}<small className="text-sm"> lbs</small></span></li>
        <li className="flex justify-between"><span>Bodyweight Entries</span> <span>{weight.weightEntries || 0} <small className="text-sm"> ent</small></span></li>
        <hr className="my-2" />
        <li className="flex justify-between"><span>Todays Mood</span> <span>{mood.mostRecentMood}</span></li>
        <li className="flex justify-between"><span>Mood Entries</span> <span>{mood.moodEntries} <small className="text-sm"> ent</small></span></li>
      </ul>
    </div>
  )
}
