import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ExercisePage() {
  return (
    <Page className="pt-16">
      <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black pt-16">
        <div className="flex justify-center mb-6">
          <Link className={buttonVariants({ variant: 'glassGreen', size: 'lg' })} href="/dashboard/exercise/log"> Log Exercise </Link>
        </div>
        <div className="h-full overflow-y-auto">
          <ExerciseEntries />
          <div className="h-32 opacity-50">
            <h3 className="text-center text-2xl font-bold dark:text-white"> No more exercises to show </h3>
          </div>
        </div>
      </div>
    </Page>
  )
}
