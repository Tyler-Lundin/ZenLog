import fetchUserDay from "@/lib/fetchUserDay";
import { RootState } from "@/_store";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setVitals, setVitalsDone, setUserDay } from "@/_store/slices/dashboardSlice";


const useUserDay = () => {
  const { month, day, year } = useSelector((state: RootState) => state.dashboard.userDay)
  const { data, isError } = useQuery(`${month}/${day}/${year}`, () => fetchUserDay({ month, day, year }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.userDay && data?.userDay?.id) dispatch(setUserDay(data.userDay));
    else return
    if (data?.vitals?.bodyweight?.isDone && data?.vitals?.mood?.isDone && data?.vitals?.sleep?.isDone) dispatch(setVitalsDone())
    if (data?.vitals) dispatch(setVitals(data.vitals));
  }, [data, dispatch])
  if (isError) return { month, day, year }
  return { userDay: data?.userDay || { month, day, year, id: '' } }
}

export default useUserDay;
