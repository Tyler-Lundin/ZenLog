import { Input } from "@/components/ui/input"
import { formatLeadingZero } from "@/lib/utils"
import { AppDispatch, RootState } from "@/_store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBodyweight } from "@/_store/slices/dashboardSlice"


export default function BodyweightStep() {
  const { bodyweight } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>(bodyweight.value.toString() ? '0' : bodyweight.value.toString())

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
    <div className="relative grid justify-center h-fit rounded-lg pt-2 w-full ">
      <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black">BODYWEIGHT</h1>
      <Input variant="glass" size="8xlFit" className=" text-center dark:text-white" type="number" value={inputValue} onChange={handleChange} />
      <div className="">
        <p className="text-center text-black dark:text-white text-2xl md:text-4xl font-black">KG</p>
        <p className="text-center text-black dark:text-white text-2xl md:text-4xl font-black">LBS</p>
      </div>
    </div>
  )
}
