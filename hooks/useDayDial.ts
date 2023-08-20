import fetchUserWeek from "@/lib/fetchUserWeek";
import { RootState } from "@/_store";
import { useQuery } from "react-query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { UserDay } from "@prisma/client";
import { computeDateMinusX, computeDatePlusX, getWeekOfYear, getWeekday } from "@/lib/utils";
import { DateObject } from "@/types/global";
import { useMemo } from "react";
import { setLoading } from "@/_store/slices/uiSlice";
import fetchDaySlider from "@/lib/fetchDaySlider";

const pastDaysToLoad = 10;
const futureDaysToLoad = 10;

type UserDayLookup = Record<string, UserDay>;


const useDayDial = () => {
  const { month, day, year } = useSelector((state: RootState) => state.dashboard.userDay, shallowEqual)
  const weekOfYear = getWeekOfYear(day, month, year)
  const { data, isError, isLoading, } = useQuery(['dayDial', month, day, year], fetchDaySlider.bind(null, month, day, year));
  const { userWeek = [] as UserDay[], } = data || {};
  const dispatch = useDispatch();

  const days: (UserDay | DateObject)[] = useMemo(() => {
    const pastDays = Array.from({ length: pastDaysToLoad }, (_, i) => computeDateMinusX(i + 1, +year, +month, +day)).reverse()
    const futureDays = Array.from({ length: futureDaysToLoad }, (_, i) => computeDatePlusX(i + 1, +year, +month, +day))
    return [...pastDays, { month: +month, day: +day, year: +year, weekday: getWeekday(new Date(+year, +month - 1, +day)) }, ...futureDays]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, day, year])

  const userWeekLookup = userWeek.reduce((acc: UserDayLookup, userDay: UserDay) => {
    acc[`${userDay.year}-${userDay.month}-${userDay.day}`] = userDay;
    return acc;
  }, {} as UserDayLookup);

  const week = days.map(defaultDay => {
    const foundDay = userWeekLookup[`${defaultDay.year}-${defaultDay.month}-${defaultDay.day}`];
    return foundDay || defaultDay;
  });


  if (isError) {
    console.log('error', isError)
  }

  if (isLoading) {
    dispatch(setLoading(true))
  }
  else dispatch(setLoading(false))

  return {
    week,
    month, day, year,
    isError, isLoading,
    weekOfYear,
  }
}

export default useDayDial;
