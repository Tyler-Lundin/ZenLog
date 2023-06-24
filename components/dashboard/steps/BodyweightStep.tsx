import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { nextNewSetStep, setDailyWeight } from "@/store/appSlice"
import { AppDispatch, RootState } from "@/store/store"
import { IoScaleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"


export default function BodyweightStep() {

  const { weight } = useSelector((state: RootState) => state.app.dashboard.dailyCheck)
  const dispatch = useDispatch<AppDispatch>();

  const handleSetWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const weight = parseInt(e.target.value)
    if (weight > 999 || weight < 0) return
    dispatch(setDailyWeight(weight));
  }

  return (
    <>
      <label className="text-center text-2xl font-thin">How much do you weigh today?</label>
      <div className="relative border-b dark:border-white border-black mx-4 grid justify-center">
        <Input variant="glass" size="8xlFit" className="w-60 text-center" max={999} type="number" value={weight} onChange={handleSetWeight} />
        <span className="text-2xl absolute right-0 bottom-0">lbs</span>
        <IoScaleOutline className="absolute left-0 bottom-1 text-2xl" />
      </div>
      <div className="flex justify-center gap-4 mt-20">
        <Button onClick={() => dispatch(nextNewSetStep())} variant="red" className="text-3xl font-thin">skip</Button>
      </div>
    </>

  )
}
