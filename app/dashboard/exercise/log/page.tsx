"use client"
import { RootState } from "@/_store";
import Breadcrumbs, { Breadcrumb } from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import LogExerciseEntry from "@/components/exercise/LogExerciseEntry";
import { useSelector } from "react-redux";

export default function NewExerciseEntryPage() {

  const { newEntry } = useSelector((state: RootState) => state.exercise);
  const { currentStep, exercise: { id, name }, reps, weight, intensity, toFailure, tags, notes } = newEntry;


  return (
    <Page>
      <LogExerciseEntry />
    </Page>
  )
}
