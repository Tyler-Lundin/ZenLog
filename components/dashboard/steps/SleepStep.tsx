import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/_store";
import { IoBed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSleep } from "@/_store/slices/dashboardSlice";
import { formatLeadingZero } from "@/lib/utils";


export default function SleepStep() {
  const { sleep } = useSelector((state: RootState) => state.dashboard.dailyEntries)
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const sleep = parseInt(formatLeadingZero((e.target.value)));
    if (sleep > 24 || sleep < 0) return
    dispatch(setSleep(sleep));
  }

  return (
    <>
      <label className="text-center text-xl md:text-2xl font-thin text-black dark:text-white">How much sleep did you get?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center text-black dark:text-white">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" min={0} max={24} type="number" value={sleep} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0">hrs</span>
        <IoBed className="absolute left-0 bottom-1 text-2xl" />
      </div>
    </>
  )
}
