import Page from "@/components/Page";
import ExerciseCards from "@/components/exercise/ExerciseCards";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import AddExerciseEntry from "@/components/exercise/AddExerciseEntry";
import { Sheet } from "@/components/ui/sheet";



export default function ExercisePage() {
  return (
    <Page>
      <Sheet>
        <div className="grid gap-4">
          <ExerciseActions />
          <AddExerciseEntry />
          <ExerciseCards />
        </div>
      </Sheet>
    </Page>
  )
}
