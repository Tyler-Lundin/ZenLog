


type User = {
  name: string;
  id: string;
  email: string;
  image: string;
}



type ExerciseSet = {
  id: number;
  exerciseName: string;
  exerciseId: number;
  userId: number;
  reps: number;
  weight: number;
  date: Date;
  intensity: number;
  volume: number;
  isWarmupSet: boolean;
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}


