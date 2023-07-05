import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries2";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import LogExerciseEntry from "@/components/exercise/LogExerciseEntry";
import { Sheet } from "@/components/ui/sheet";



export default function ExercisePage() {
  return (
    <Page>
      <div className="grid gap-4">
        <Sheet>
          <ExerciseActions />
        </Sheet>
        <LogExerciseEntry />
        <ExerciseEntries />
      </div>
    </Page>
  )
}
