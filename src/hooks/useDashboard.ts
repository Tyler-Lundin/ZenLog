"use client";
import { useEffect } from "react";
import { atom, useAtom } from 'jotai';
import { useSession } from "next-auth/react";

export const dateOffsetAtom = atom(0);
export const currentDateAtom = atom(new Date());
export const currentEventAtom = atom("exercise");

const CONFIG:Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
}

const useDashboard = () => {
  const [dateOffset, setDateOffset] = useAtom(dateOffsetAtom); 
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom); 
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const setYesterday = () => setDateOffset(dateOffset - 1);
  const setTomorrow = () => setDateOffset(dateOffset + 1);

  useEffect(() => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dateOffset);
    setCurrentDate(newDate);
  }, [dateOffset, setCurrentDate]);

  const todayString = currentDate.toLocaleDateString("en-US", CONFIG); 
  const yesterdayString = yesterdayDate.toLocaleDateString("en-US", CONFIG);
  const tomorrowString = tomorrowDate.toLocaleDateString("en-US", CONFIG);



  return {
    todayString,
    yesterdayString,
    tomorrowString,
    setYesterday,
    setTomorrow,
  };
};

export default useDashboard;
