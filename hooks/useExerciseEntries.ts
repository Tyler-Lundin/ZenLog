import { ExerciseEntry } from "@prisma/client";
import { useQuery } from "react-query";
import useUserDay from "./useUserDay";


const useExerciseEntries = () => {
  const { userDay: { id } } = useUserDay();
  const { data } = useQuery(`exercise-entries-${id}`, async () => {
    return fetch(`/api/entries/exercise?dayId=${id}`).then((res) => res.json());
  });

  return {
    exerciseEntries: data?.exerciseEntries || [] as ExerciseEntry[],
  }
}

export default useExerciseEntries;
