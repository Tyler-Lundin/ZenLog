import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ExercisePage() {
  return (
    <Page className="pt-16">
      <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black pt-28">
        <div className="flex justify-center mb-6 z-40">
          <Link className={buttonVariants({ variant: 'green', size: 'lg' })} href="/dashboard/exercise/log"> Log Exercise </Link>
        </div>
        <div className="h-full overflow-y-auto">
          <ExerciseEntries />
        </div>
      </div>
    </Page>
  )
}
