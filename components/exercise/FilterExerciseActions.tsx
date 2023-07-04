'use client'
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { toggleSortExercise } from "@/store/uiSlice";
import { BsClockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function FilterExerciseActions() {
  const { isSorted } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 w-full items-center">
      <Button className="overflow-hidden" onClick={() => dispatch(toggleSortExercise())}>
        <div className={`flex gap-2 place-items-center w-full h-full `}>
          <BsClockFill />
          <h2 className="text-xs font-light">{isSorted ? 'New To Old' : 'Old To New'}</h2>
        </div>
      </Button>
    </div>
  )
}
