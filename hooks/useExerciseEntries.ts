import { RootState } from "@/store/store";
import { ExerciseEntry } from "@prisma/client";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";


const useExerciseEntries = () => {
  const { id } = useSelector((state: RootState) => state.app.userDay);
  const { data } = useQuery(`exercise-entries-${id}`, async () => {
    return fetch(`/api/entries/exercise?dayId=${id}`).then((res) => res.json());
  });

  return {
    exerciseEntries: data?.exerciseEntries || [] as ExerciseEntry[],
  }
}

export default useExerciseEntries;
