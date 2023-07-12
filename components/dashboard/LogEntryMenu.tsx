'use client';
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/_store";
import { buttonVariants } from "../ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils";
import BackButton from "../ui/BackButton";
import { useState } from "react";
import { Spinner } from "../ui/Spinner";
import { toggleEntrySelector } from "@/_store/slices/uiSlice";

const EVENTS = [
  { name: "Exercise", icon: "🏋️" },
  { name: "Food", icon: "🍔" },
  { name: "Water", icon: "🚰" },
  { name: "Journal", icon: "📓" },
]

export default function LogEntryMenu() {
  const { isEntrySelectorOpen } = useSelector((state: RootState) => state.ui)
  const [isLoading, setIsLoading] = useState(false);
  const [decision, setDecision] = useState('');

  if (!isEntrySelectorOpen) /****/ return null
  if (isLoading) /***************/ return <Loading decision={decision} />
  if (!isLoading) /**************/ return <NotLoading setIsLoading={setIsLoading} setDecision={setDecision} />
}

const NotLoading = ({ setIsLoading, setDecision }: { setIsLoading: (b: boolean) => void, setDecision: (s: string) => void }) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-white dark:bg-black grid place-content-center">
      <BackButton onClick={() => dispatch(toggleEntrySelector(false))} />
      <h1 className="text-4xl font-thin mb-4 text-center dark:text-white">What would you like to log?</h1>
      <ul className="flex flex-wrap place-content-center max-w-2xl gap-4 w-full">
        {EVENTS.map((event, i) => (
          <li key={i} className="w-full max-w-xs" onClick={() => {
            setIsLoading(true)
            setDecision(event.name)
          }}>
            <Link
              className={cn(
                buttonVariants({ variant: 'default' }),
                'text-4xl w-full', 'p-8'
              )}
              href={`/dashboard/${event.name.toLowerCase()}`
              }>
              {event.name} {event.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Loading = ({ decision }: { decision: string }) => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white dark:bg-black grid place-content-center">
      <BackButton onClick={() => null} />
      <h1 className="text-4xl font-thin mb-4 text-center dark:text-white">Loading {decision}</h1>
      <div className="w-full h-full flex place-content-center place-items-center">
        <Spinner />
      </div>
    </div>
  )
}
