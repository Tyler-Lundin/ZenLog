import { useQuery } from "react-query";
import useUserDay from "./useUserDay";
import { Mood } from "@prisma/client";

interface DashboardData {
  sleep: {
    totalHours: number;
    averageSleep: number;
    maxSleep: number;
    minSleep: number;
    sleepEntries: number;
  };
  bodyweight: {
    averageBodyweight: number;
    bodyweightEntries: number;
    minBodyweight: number;
    maxBodyweight: number;
  };
  mood: {
    mostRecentMood: Mood | null;
    moodEntries: number;
    moodFrequency: { [mood in Mood]: number } | null;
  };
  exercise: {
    totalReps: number;
    averageReps: number;
    totalWeight: number;
    averageWeight: number;
    maxWeight: number;
    minWeight: number;
    totalExercises: number;
    totalVolume: number;
  };
}



export default function useDashboardData(): DashboardData {
  const { userDay } = useUserDay();
  const { id } = userDay;
  const { data } = useQuery<DashboardData>(`dashboard-${id}`, async () => {
    console.log("fetching dashboard data")
    return fetch(`/api/dashboard?dayId=${id}`).then((res) => res.json());
  }, { enabled: !!id });


  return {
    sleep: {
      totalHours: data?.sleep.totalHours || 0,
      averageSleep: data?.sleep.averageSleep || 0,
      maxSleep: data?.sleep.maxSleep || 0,
      minSleep: data?.sleep.minSleep || 0,
      sleepEntries: data?.sleep.sleepEntries || 0,
    },
    bodyweight: {
      averageBodyweight: data?.bodyweight.averageBodyweight || 0,
      bodyweightEntries: data?.bodyweight.bodyweightEntries || 0,
      minBodyweight: data?.bodyweight.minBodyweight || 0,
      maxBodyweight: data?.bodyweight.maxBodyweight || 0,
    },
    mood: {
      mostRecentMood: data?.mood.mostRecentMood || null,
      moodEntries: data?.mood.moodEntries || 0,
      moodFrequency: data?.mood.moodFrequency || null,
    },
    exercise: {
      totalReps: data?.exercise.totalReps || 0,
      averageReps: data?.exercise.averageReps || 0,
      totalWeight: data?.exercise.totalWeight || 0,
      averageWeight: data?.exercise.averageWeight || 0,
      maxWeight: data?.exercise.maxWeight || 0,
      minWeight: data?.exercise.minWeight || 0,
      totalExercises: data?.exercise.totalExercises || 0,
      totalVolume: data?.exercise.totalVolume || 0,
    },
  }
}
