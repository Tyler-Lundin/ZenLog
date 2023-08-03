import fetchUserDay from "@/api/fetchUserDay";
import { RootState } from "@/_store";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setDailyEntries, setDailyEntriesDone, setUserDay } from "@/_store/slices/dashboardSlice";


const useUserDay = () => {
  const { month, day, year } = useSelector((state: RootState) => state.dashboard.userDay)
  const { data, isError } = useQuery(`${month}/${day}/${year}`, () => fetchUserDay({ month, day, year }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.userDay && data?.userDay?.id) dispatch(setUserDay(data.userDay));
    else return
    if (data?.dailyEntries?.bodyweight?.isDone && data?.dailyEntries?.mood?.isDone && data?.dailyEntries?.sleep?.isDone) dispatch(setDailyEntriesDone())
    if (data?.dailyEntries) dispatch(setDailyEntries(data.dailyEntries));
  }, [data, dispatch])
  if (isError) return { month, day, year }
  return { userDay: data?.userDay || { month, day, year, id: '' } }
}

export default useUserDay;
