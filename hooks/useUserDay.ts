import fetchUserDay from "@/api/fetchUserDay";
import { setUserDay } from "@/store/appSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";


const useUserDay = () => {
  const { month, day, year } = useSelector((state: RootState) => state.app.userDay)
  const { data, isError } = useQuery(`${month}/${day}/${year}`, () => fetchUserDay({ month, day, year }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.userDay && data?.userDay?.id) dispatch(setUserDay(data.userDay));
  }, [data, dispatch])
  if (isError) return { month, day, year }
  return { userDay: data?.userDay || { userDay: { month, day, year, id: '' } } }
}

export default useUserDay;
