import fetchUserWeek from "@/lib/fetchUserWeek";
import { RootState } from "@/_store";
import { useQuery } from "react-query";
import { shallowEqual, useSelector } from "react-redux";
import { UserDay } from "@prisma/client";
import { getWeekOfYear } from "@/lib/utils";

const useUserWeek = () => {
  console.log("useUserWeek")
  const { month, day, year } = useSelector((state: RootState) => state.dashboard.userDay, shallowEqual)
  const weekOfYear = getWeekOfYear(day, month, year)
  console.log({ weekOfYear })
  const { data, isError, isLoading, } = useQuery(`/week/${weekOfYear}/${year}`, () => fetchUserWeek({ month, day, year }));
  if (isError) return { month, day, year }
  return {
    userWeek: data?.userWeek || [] as UserDay[],
    month, day, year,
    isError, isLoading,
    weekOfYear,
  }
}

export default useUserWeek;
