import Page from "@/components/Page";
import TitleBlock from "@/components/dashboard/TitleBlock";
import LogExerciseBlock from "@/components/dashboard/exercise/LogExerciseBlock";
import ExerciseCards from "@/components/dashboard/exercise/ExerciseCards";
import ExerciseActions from "@/components/dashboard/exercise/ExerciseActions";



export default function ExercisePage() {
  return (
    <Page>
      <div className="grid gap-4">
        <TitleBlock title="Exercise">
          <ExerciseActions />
        </TitleBlock>
        <LogExerciseBlock />
        <ExerciseCards />
      </div>
    </Page>
  )
}
