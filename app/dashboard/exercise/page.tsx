import Page from "@/components/Page";
import ExerciseEntries from "@/components/exercise/ExerciseEntries";
import ExerciseActions from "@/components/exercise/ExerciseActions";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";



export default function ExercisePage() {
  return (
    <Page>
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
