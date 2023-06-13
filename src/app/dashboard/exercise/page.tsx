'use client';
import Page from "@/components/Page";
import TitleBlock from "@/components/dashboard/TitleBlock";
import LogExerciseForm from "@/components/dashboard/exercise/LogExerciseForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { BiPlus, BiStats } from "react-icons/bi";
import { GoTriangleDown } from "react-icons/go";
import ExerciseCards from "@/components/dashboard/exercise/ExerciseCards";



export default function ExercisePage() {

  const [isLogExerciseFormOpen, setIsLogExerciseFormOpen] = useState(false);
  const toggleLogExerciseForm = () => setIsLogExerciseFormOpen((prev) => !prev);

  return (
    <Page>
      <div className="grid gap-4">
        <TitleBlock title="Exercise">
          <ul className="flex gap-4 w-full">
            <Button size="mdSquare" className={`transition-all relative`} variant="logEvent" onClick={toggleLogExerciseForm}>
              <BiPlus />
              <span className={`absolute ${isLogExerciseFormOpen ? "bottom-0 opacity-100" : " bottom-1/2 opacity-0"} transition-all left-1/2 transform text-sm -translate-x-1/2 translate-y-full`}><GoTriangleDown className="text-green-500" /></span>
            </Button>
            <Button size="mdSquare" variant="default" onClick={() => console.log('clack')}> <BiStats /> </Button>
            <Button size="mdSquare" variant="default" onClick={() => console.log('click')}> <BsGearFill /> </Button>
          </ul>
        </TitleBlock>
        {isLogExerciseFormOpen && <LogExerciseForm />}
        <ExerciseCards />
      </div>
    </Page>
  )
}
