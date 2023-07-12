import { ExerciseEntry } from "@prisma/client";
import { useQuery } from "react-query";
import useUserDay from "./useUserDay";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const useExerciseEntries = () => {
  const { userDay: { id } } = useUserDay();
  const { isSorted } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const { data, isError, isLoading } = useQuery(`exercise-entries-${id}`, async () => {
    return fetch(`/api/entries/exercise?userDayId=${id}`).then((res) => res.json());
  }, { enabled: !!id });

  const entries = data?.exerciseEntries as ExerciseEntry[] || [] as ExerciseEntry[];

  const exerciseEntries = entries.length > 0 ? entries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) : []


  return {
    exerciseEntries,
    isLoading,
  }
}

export default useExerciseEntries;
