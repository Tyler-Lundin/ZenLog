import fetchUserDay from "@/api/fetchUserDay";
import { RootState } from "@/store/store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";


const useUserDay = () => {
  const { month, day, year } = useSelector((state: RootState) => state.app.userDay)
  const { data, isError } = useQuery(`${month}/${day}/${year}`, () => fetchUserDay({ month, day, year }));
  console.log('useUserDay: ', data);
  if (isError) return { month, day, year }
  return { userDay: data?.userDay || { month, day, year, id: '' } }
}

export default useUserDay;
