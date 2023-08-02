import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import LogExerciseEntry from "@/components/exercise/LogExerciseEntry";



export default function ExercisePage() {
  return (
    <Page className="pt-16">
      <div className="grid gap-4 z-30">
        <ExerciseActions />

        <div className="flex justify-center">
          <Link className={buttonVariants({ variant: 'logEvent', size: 'lgSquare' })} href="/dashboard/exercise/log"> <AiOutlinePlus /> </Link>
        </div>
        <ExerciseEntries />
      </div>
    </Page>
  )
}
