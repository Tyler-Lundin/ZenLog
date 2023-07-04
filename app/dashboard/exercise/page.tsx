import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import AddExerciseEntry from "@/components/exercise/AddExerciseEntry";
import { Sheet } from "@/components/ui/sheet";



export default function ExercisePage() {
  return (
    <Page>
      <div className="grid gap-4">
        <Sheet>
          <ExerciseActions />
        </Sheet>
        <AddExerciseEntry />
        <ExerciseEntries />
      </div>
    </Page>
  )
}
