'use client';
import Page from "@/components/Page";
import TitleBlock from "@/components/dashboard/TitleBlock";
import LogExerciseForm from "@/components/dashboard/exercise/LogExerciseForm";
import { Button } from "@/components/ui/button";
import { setExerciseEntries } from "@/store/appSlice";
import { useEffect, useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { BiPlus, BiStats } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import useSWR from 'swr';
import { RootState } from "@/store/store";
import { GoTriangleDown } from "react-icons/go";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExercisePage() {

  const [isLogExerciseFormOpen, setIsLogExerciseFormOpen] = useState(false);
  const toggleLogExerciseForm = () => setIsLogExerciseFormOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.app.date);

  const { data } = useSWR(`/api/entries/exercise?date=${id}`, fetcher);

  useEffect(() => {
    console.log("EXERCISE PAGE DATA: ", data)
    if (data) dispatch(setExerciseEntries(data));
  }, [data, dispatch])

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
      </div>
    </Page>
  )
}
