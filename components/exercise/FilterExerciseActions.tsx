'use client'
import { Button } from "@/components/ui/button";
import { RootState } from "@/_store";
import { BsClockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleSortOrder } from "@/_store/slices/exerciseSlice";

export default function FilterExerciseActions() {
  const { isFiltered } = useSelector((state: RootState) => state.exercise)
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 w-full items-center">
      <Button className="overflow-hidden" onClick={() => dispatch(toggleSortOrder())}>
        <div className={`flex gap-2 place-items-center w-full h-full `}>
          <BsClockFill />
          <h2 className="text-xs font-light">{isFiltered ? 'New To Old' : 'Old To New'}</h2>
        </div>
      </Button>
    </div>
  )
}
