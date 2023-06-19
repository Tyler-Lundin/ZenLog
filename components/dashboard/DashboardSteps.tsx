'use client';
import DailyCheckIn from "./DailyCheckIn";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


export default function DashboardSteps() {

  const { isDone } = useSelector((state: RootState) => state.app.dashboard.dailyCheckIn)

  if (isDone) return null
  return <DailyCheckIn />

}
