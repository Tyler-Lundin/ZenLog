'use client';
import { SheetTrigger } from "@/components/ui/sheet";
import FilterExerciseActions from "./FilterExerciseActions";
import LogButton from "../dashboard/LogButton";

export default function ExerciseActions() {
  return (
    <>
      <ul className="flex gap-4 w-full  p-2">
        <FilterExerciseActions />
      </ul>
    </>
  )
}
