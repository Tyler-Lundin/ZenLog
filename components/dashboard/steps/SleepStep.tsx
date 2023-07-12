import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/_store";
import { IoBed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSleep } from "@/_store/slices/dashboardSlice";
import { formatLeadingZero } from "@/lib/utils";
import { useState } from "react";


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
      <label className="text-center text-xl md:text-2xl font-thin text-black dark:text-white">How much sleep did you get?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center text-black dark:text-white">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" type="number" value={inputValue} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0">hrs</span>
        <IoBed className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>
  )
}

//
// export default function BodyweightStep() {
//   const { bodyweight } = useSelector((state: RootState) => state.dashboard.dailyEntries)
//   const dispatch = useDispatch<AppDispatch>();
//   const [inputValue, setInputValue] = useState<string>(bodyweight.value.toString())
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let W = formatLeadingZero(e.target.value) as string;
//     if (W.length === 1) {
//       W = `00${W}`
//       setInputValue(W);
//       dispatch(setBodyweight(parseInt(W)))
//       return
//     }
//     if (W.length === 2) {
//       W = `0${W}`
//       setInputValue(W);
//       dispatch(setBodyweight(parseInt(W)))
//       return
//     }
//     if (W.length === 3) {
//       setInputValue(W);
//       dispatch(setBodyweight(parseInt(W)))
//       return
//     }
//   }
//
//   useEffect(() => {
//     if (bodyweight.value.toString().length === 1) {
//       setInputValue(`00${bodyweight.value}`)
//       return
//     }
//     if (bodyweight.value.toString().length === 2) {
//       setInputValue(`0${bodyweight.value}`)
//       return
//     }
//     if (bodyweight.value.toString().length === 3) {
//       setInputValue(`${bodyweight.value}`)
//       return
//     }
//   }, [bodyweight.value])
