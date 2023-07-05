import fetchBodyweight from "@/api/fetchBodyweight";
import { RootState } from "@/store/store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";



export default function YourBodyweight() {
  const { month, day, year } = useSelector((state: RootState) => state.app.userDay);
  // const query = useQuery('bodyweight', fetchBodyweight())


  return (
    <>
      <h1>Your Bodyweight</h1>
    </>
  )
}
