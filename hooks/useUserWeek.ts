import fetchUserWeek from "@/lib/fetchUserWeek";
import { RootState } from "@/_store";
import { useQuery } from "react-query";
import { shallowEqual, useSelector } from "react-redux";
import { UserDay } from "@prisma/client";
import { getWeekOfYear, getWeekday } from "@/lib/utils";
import { DateObject } from "@/types/global";
import { useMemo } from "react";


type UserDayLookup = Record<string, UserDay>;

const useUserWeek = () => {
  const { month, day, year } = useSelector((state: RootState) => state.dashboard.userDay, shallowEqual)
  const weekOfYear = getWeekOfYear(day, month, year)
  const { data, isError, isLoading, } = useQuery(['userWeek', weekOfYear, year], fetchUserWeek.bind(null, month, day, year));
  const { userWeek = [] as UserDay[], } = data || {};

  const selectedDates: DateObject[] = useMemo(() => {
    const computeDateMinusX = (x: number) => {
      const date = new Date(+year, +month - 1, +day)
      date.setDate(date.getDate() - x)
      return { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear(), weekday: getWeekday(date) }
    }
    return [
      computeDateMinusX(3),
      computeDateMinusX(2),
      computeDateMinusX(1),
      { month: +month, day: +day, year: +year, weekday: getWeekday(new Date(+year, +month - 1, +day)) },
      computeDateMinusX(-1),
      computeDateMinusX(-2),
      computeDateMinusX(-3),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year]) //should only update when weekOfYear changes

  const userWeekLookup = userWeek.reduce((acc: UserDayLookup, userDay: UserDay) => {
    acc[`${userDay.year}-${userDay.month}-${userDay.day}`] = userDay;
    return acc;
  }, {} as UserDayLookup);

  const week = selectedDates.map(defaultDay => {
    const foundDay = userWeekLookup[`${defaultDay.year}-${defaultDay.month}-${defaultDay.day}`];
    return foundDay || defaultDay;
  });

  return {
    week,
    month, day, year,
    isError, isLoading,
    weekOfYear,
  }
}

export default useUserWeek;
