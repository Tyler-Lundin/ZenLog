'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IoBarbell } from "react-icons/io5";

export default function LogButton({
  className = "fixed bottom-4 right-2 z-40",
}: {
  className?: string
}) {
  const router = useRouter();


  return (
    <Button variant="green" onClick={() => router.push('/dashboard/exercise')} className={`${className} aspect-square rounded-full outline-black  grid  place-items-center font-bold h-12 group`}>
      <div className="flex gap-2 place-items-center">
        <IoBarbell size="20" className="text-white dark:text-black group-hover:text-green-500" />
        <h2 className="hidden md:inline uppercase font-bold text-white dark:text-black text-sm md:text-xl group-hover:text-green-500">Exercise</h2>
      </div>
    </Button>
  )
}
