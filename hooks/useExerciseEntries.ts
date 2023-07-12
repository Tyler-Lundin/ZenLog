import { ExerciseEntry } from "@prisma/client";
import { useQuery } from "react-query";
import useUserDay from "./useUserDay";
import { useSelector } from "react-redux";
import { RootState } from "@/_store";


const useExerciseEntries = () => {
  const { userDay: { id } } = useUserDay();
  const { sortBy, sortOrder, isFiltered } = useSelector((state: RootState) => state.exercise)
  const { data, isLoading } = useQuery(`exercise-entries-${id}`, async () => {
    return fetch(`/api/entries/exercise?userDayId=${id}`).then((res) => res.json());
  }, { enabled: !!id });

  return {
    exerciseEntries: data as ExerciseEntry[],
    isLoading,
  }
}

export default useExerciseEntries;
