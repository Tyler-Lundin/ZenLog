'use client';
import { useDispatch, useSelector } from "react-redux";
import DashboardBlock from "./DashboardBlock";
import { RootState } from "@/store/store";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { decrementDate, incrementDate, resetDate } from "@/store/appSlice";
import { Button } from "../ui/button";

export default function DateBlock() {

  const todaysMonth = new Date().getMonth() + 1;
  const todaysDay = new Date().getDate();
  const todaysYear = new Date().getFullYear();
  const { month, day, year } = useSelector((state: RootState) => state.app.date)
  const isCurrentDate = todaysMonth === month && todaysDay === day && todaysYear === year;
  const dispatch = useDispatch();

  return (
    <DashboardBlock>
      <Button size="lgSquare" variant="ghost" onClick={() => dispatch(decrementDate())} className="absolute left-4 top-1/2 -translate-y-1/2"> <AiOutlineLeft /> </Button>
      {isCurrentDate ?
        <div className="font-light border rounded-lg bg-black text-white dark:text-black dark:bg-white px-2 "> Today </div>
        :
        <div role="button" onClick={() => dispatch(resetDate())} className="font-light hover:opacity-70 border rounded-lg bg-black text-white dark:text-black dark:bg-white px-2 "> Reset Date </div>
      }
      <div className="text-2xl font-bold dark:text-white text-black">
        {month}/{day}/{year}
      </div>
      <Button size="lgSquare" variant="ghost" onClick={() => dispatch(incrementDate())} className="absolute right-4 top-1/2 -translate-y-1/2"> <AiOutlineRight /> </Button>

    </DashboardBlock>
  )
}
