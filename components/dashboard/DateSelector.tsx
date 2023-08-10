"use client"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux";
import { decrementDate, incrementDate, resetDate } from "@/_store/slices/dashboardSlice";
import useUserDay from "@/hooks/useUserDay";



export default function DateSelector() {
  const dispatch = useDispatch()
  const { userDay } = useUserDay()
  if (!userDay) return null
  const { month, day, year } = userDay
  return (
    <div className="relative flex place-content-center grid-flow-row ">
      <Button
        size="mdSquare"
        variant="ghost"
        onClick={() => dispatch(decrementDate())} >
        <AiOutlineLeft />
      </Button>
      <div className="grid place-items-center">
        <Button
          variant="default"
          size="sm"
          onClick={() => dispatch(resetDate())}>
          {month}/{day}/{year}
        </Button>
      </div>
      <Button
        size="mdSquare"
        variant="ghost"
        onClick={() => dispatch(incrementDate())}>
        <AiOutlineRight />
      </Button>
    </div>
  )
}
