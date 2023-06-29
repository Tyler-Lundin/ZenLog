'use client';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { decrementDate, incrementDate, resetDate, setUserActivity, } from "@/store/appSlice";
import { Button } from "../ui/button";
import useSWR from 'swr';
import { useEffect } from "react";
import { Spinner } from "../ui/Spinner";

interface IFetchDate {
  month: number;
  day: number;
  year: number;
}

const fetchUserActivity = ({ month, day, year }: IFetchDate) => fetch('/api/user/activity', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({ month, day, year }),
}).then((res) => res.json());


export default function DateBlock() {
  const { month, day, year } = useSelector((state: RootState) => state.app.userActivity);
  const { data, error, mutate } = useSWR('/api/date', () => fetchUserActivity({ month, day, year }), { revalidateOnMount: true });
  const isLoading = !data && !error;
  const dispatch = useDispatch();

  useEffect(() => {
    mutate();
    if (data && !isLoading) dispatch(setUserActivity(data));
  }, [data, isLoading, mutate, dispatch, day, month, year])

  if (isLoading) return (
    <div className="">
      <Spinner size="sm" />
    </div>
  )
  if (error) return <div>Error</div>

  return (
    <div className="relative grid grid-cols-5 grid-flow-row">
      <Button size="mdSquare" variant="ghost" onClick={() => dispatch(decrementDate())} className="col-span-1"> <AiOutlineLeft /> </Button>
      <div className="col-span-3 grid place-items-center">
        <Button variant="default" size="sm" onClick={() => dispatch(resetDate())} className="col-span-1"> {month}/{day}/{year} </Button>
      </div>
      <Button size="mdSquare" variant="ghost" onClick={() => dispatch(incrementDate())} className="col-span-1"> <AiOutlineRight /> </Button>
    </div>
  )
}
