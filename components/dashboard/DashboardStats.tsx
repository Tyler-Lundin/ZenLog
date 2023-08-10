import ExerciseStats from "../exercise/ExerciseStats";
import BodyweightStats from "../bodyweight/BodyweightStats";

export default function DashboardStats() {

  return (
    <div className=" font-light text-lg dark:text-white px-4 w-full shadow-2xl shadow-white dark:shadow-black py-2 grid gap-8">
      <div className="grid gap-2">
        <ExerciseStats />
        <BodyweightStats />
      </div>
    </div >
  )
}
