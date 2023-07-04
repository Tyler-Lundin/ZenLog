
enum ExerciseTypes {
  FULL = 'FULL',
  META = 'META',
  NAME_AND_ID = 'NAME_AND_ID',
}

type ExerciseListConfig = {
  type: ExerciseTypes,
  filters: {
    muscleGroups: string[],
    equipment: string[],
    difficulty: string[],
  }
}

const useExerciseList = (config: ExerciseListConfig) => {

}
