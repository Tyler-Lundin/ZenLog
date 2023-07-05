import { useQuery } from "react-query";
import useUserDay from "./useUserDay";

// {
//     sleep: { totalHours, sleepEntries: sleep.length },
//     weight: { averageWeight, weightEntries: weight.length },
//     mood: { mostRecentMood: mood[mood.length - 1]?.mood, moodEntries: mood.length },
//     exercise: { totalReps, totalWeight, totalExercises: exercises.length, totalVolume: totalReps * totalWeight },
//   }

export default function useDashboardData() {
  const { userDay } = useUserDay();
  const { id } = userDay;
  const { data } = useQuery(`dashboard-${id}`, async () => {
    return fetch(`/api/dashboard?dayId=${id}`).then((res) => res.json());
  });

  return {
    sleep: data?.sleep || { totalHours: 0, sleepEntries: 0 },
    weight: data?.weight || { averageWeight: 0, weightEntries: 0 },
    mood: data?.mood || { mostRecentMood: null, moodEntries: 0 },
    exercise: data?.exercise || { totalReps: 0, totalWeight: 0, totalExercises: 0, totalVolume: 0 },
  }
}
