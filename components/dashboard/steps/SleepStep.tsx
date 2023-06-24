import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDailySleep, skipDailyStep } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IoBed } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function SleepStep() {
  const { sleep } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const sleep = parseInt(e.target.value)
    if (sleep > 24 || sleep < 0) return
    dispatch(setDailySleep(sleep));
  }

  return (
    <>
      <label className="text-center text-2xl font-thin">How much sleep did you get?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" min={0} max={24} type="number" value={sleep} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0">hrs</span>
        <IoBed className="absolute left-0 bottom-1 text-2xl" />
      </div>
      <div className="flex justify-center gap-4 mt-20">
        <Button onClick={() => dispatch(skipDailyStep('sleep'))} variant="red" className="text-3xl font-thin">skip</Button>
      </div>
    </>
  )
}
