'use client';
import Page from "@/components/Page";
import DateBlock from "@/components/dashboard/DateBlock";
import TitleBlock from "@/components/dashboard/TitleBlock";
import LogExerciseForm from "@/components/dashboard/exercise/LogExerciseForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";



export default function ExercisePage() {

  const [isLogExerciseFormOpen, setIsLogExerciseFormOpen] = useState(false);
  const toggleLogExerciseForm = () => setIsLogExerciseFormOpen((prev) => !prev);

  return (
    <Page>
      <div className="mt-16 grid gap-4">
        <TitleBlock title="Exercise" />
        <DateBlock />
        <ul className="flex gap-4 w-full">
          <Button size="sm" onClick={toggleLogExerciseForm} className={isLogExerciseFormOpen ? "opacity-50" : ""}> Log Exercise </Button>
          <Button size="sm" onClick={() => console.log('click')}> View Exercises </Button>
        </ul>
        {isLogExerciseFormOpen && <LogExerciseForm />}
      </div>
    </Page>
  )
}
