import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/_store";
import { IoBed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSleep } from "@/_store/slices/dashboardSlice";
import { formatLeadingZero } from "@/lib/utils";
import { useState } from "react";
import { Dosis } from "next/font/google";
const dosis = Dosis({ subsets: ['latin'] });


export default function SleepStep() {
  const { sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>(sleep.value.toString() ? '00' : sleep.value.toString())


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let S = formatLeadingZero((e.target.value));
    if (S.length === 1) {
      S = `0${S}`
      setInputValue(S);
      dispatch(setSleep(parseInt(S)))
      return
    }
    if (S.length === 2) {
      if (parseInt(S) > 24) {
        S = '24'
      }
      setInputValue(S);
      dispatch(setSleep(parseInt(S)))
      return
    }
  }

  return (
    <>
      <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black">SLEEP</h1>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center text-black dark:text-white">
        <Input style={dosis.style} variant="glass" size="8xlFit" className="w-60 text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0">hrs</span>
        <IoBed className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>
  )
}
