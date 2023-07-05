import { useQuery } from "react-query";
import useUserDay from "./useUserDay";

interface DashboardData {
  sleep: { totalHours: number; sleepEntries: number };
  weight: { averageWeight: number; weightEntries: number };
  mood: { mostRecentMood: null | string; moodEntries: number };
  exercise: { totalReps: number; totalWeight: number; totalExercises: number; totalVolume: number };
}

export default function useDashboardData() {
  const { userDay } = useUserDay();
  const { id } = userDay;
  const { data } = useQuery<DashboardData>(`dashboard-${id}`, async () => {
    return fetch(`/api/dashboard?dayId=${id}`).then((res) => res.json());
  }, { enabled: !!id });

  return {
    sleep: data?.sleep || { totalHours: 0, sleepEntries: 0 },
    weight: data?.weight || { averageWeight: 0, weightEntries: 0 },
    mood: data?.mood || { mostRecentMood: null, moodEntries: 0 },
    exercise: data?.exercise || { totalReps: 0, totalWeight: 0, totalExercises: 0, totalVolume: 0 },
  }
}
