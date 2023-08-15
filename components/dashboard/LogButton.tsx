'use client';
import { AppDispatch } from "@/_store";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { IoAdd, IoBarbell } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setLoading } from "@/_store/slices/uiSlice";

export default function LogButton({
  className = "fixed bottom-4 right-2 z-40",
}: {
  className?: string
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isExercisePage = pathname.includes("/dashboard/exercise");
  const dispatch = useDispatch<AppDispatch>();

  if (isExercisePage) return null


  const handleClick = () => {
    dispatch(setLoading(true))
    setTimeout(() => {
      router.push("/dashboard/exercise")
    }, 1000)
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000)
  }

  return (
    <Button variant="green" onClick={handleClick} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold h-12 group`}>
      <div className="flex gap-2 place-items-center">
        <IoBarbell size="20" className="text-white dark:text-black group-hover:text-green-500" />
        <h2 className="hidden md:inline uppercase font-bold text-white dark:text-black text-sm md:text-xl group-hover:text-green-500">Exercise</h2>
      </div>
    </Button>
  )
}
