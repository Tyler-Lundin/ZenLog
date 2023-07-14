import { Input } from "@/components/ui/input"
import { formatLeadingZero } from "@/lib/utils"
import { AppDispatch, RootState } from "@/_store"
import { useEffect, useState } from "react"
import { IoScaleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { setBodyweight } from "@/_store/slices/dashboardSlice"
import { Dosis } from "next/font/google";
const dosis = Dosis({ subsets: ['latin'] });


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
      <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black">BODYWEIGHT</h1>
      <div className="relative mx-4 text-black dark:text-white h-fit">
        <Input style={dosis.style} variant="glass" size="8xlFit" className="w-full text-center" max={999} type="number" value={inputValue} onChange={handleChange} />
      </div>
    </>

  )
}
