import { Input } from "@/components/ui/input"
import { formatLeadingZero } from "@/lib/utils"
import { AppDispatch, RootState } from "@/_store"
import { useEffect, useState } from "react"
import { IoScaleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { setBodyweight } from "@/_store/slices/dashboardSlice"


export default function BodyweightStep() {
  const { bodyweight } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>(bodyweight.value.toString() ? '000' : bodyweight.value.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let W = formatLeadingZero(e.target.value) as string;
    if (W.length === 1) {
      W = `00${W}`
      setInputValue(W);
      dispatch(setBodyweight(parseInt(W)))
      return
    }
    if (W.length === 2) {
      W = `0${W}`
      setInputValue(W);
      dispatch(setBodyweight(parseInt(W)))
      return
    }
    if (W.length === 3) {
      setInputValue(W);
      dispatch(setBodyweight(parseInt(W)))
      return
    }
  }

  useEffect(() => {
    if (bodyweight.value.toString().length === 1) {
      setInputValue(`00${bodyweight.value}`)
      return
    }
    if (bodyweight.value.toString().length === 2) {
      setInputValue(`0${bodyweight.value}`)
      return
    }
    if (bodyweight.value.toString().length === 3) {
      setInputValue(`${bodyweight.value}`)
      return
    }
  }, [bodyweight.value])



  return (
    <>
      <label className="text-center text-black dark:text-white text-xl md:text-2xl font-thin">How much do you weigh today?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center text-black dark:text-white">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" max={999} type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 ">lbs</span>
        <IoScaleOutline className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>

  )
}
