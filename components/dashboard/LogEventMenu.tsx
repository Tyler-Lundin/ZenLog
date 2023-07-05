'use client';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { buttonVariants } from "../ui/button"
import { AppDispatch } from "@/store/store"
import { openLogExerciseForm, toggleLogEventMenu } from "@/store/uiSlice"
import Link from "next/link";
import { cn } from "@/lib/utils";
import BackButton from "../ui/BackButton";
import { useState } from "react";
import { Spinner } from "../ui/Spinner";

const EVENTS = [
  { name: "Exercise", icon: "🏋️" },
  { name: "Food", icon: "🍔" },
  { name: "Water", icon: "🚰" },
  { name: "Journal", icon: "📓" },
]

export default function LogEventMenu() {
  const { isLogEventMenuOpen, exercise } = useSelector((state: RootState) => state.ui.dashboard)
  const [isLoading, setIsLoading] = useState(false);
  const [decision, setDecision] = useState('');
  if (!isLogEventMenuOpen) return null
  if (isLoading) return <Loading decision={decision} />
  if (!isLoading) return <NotLoading setIsLoading={setIsLoading} setDecision={setDecision} />
}

const NotLoading = ({ setIsLoading, setDecision }: { setIsLoading: (b: boolean) => void, setDecision: (s: string) => void }) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white dark:bg-black grid place-content-center">
      <BackButton onClick={() => dispatch(toggleLogEventMenu())} />
      <h1 className="text-4xl font-thin mb-4 text-center dark:text-white">What would you like to log?</h1>
      <ul className="flex flex-wrap place-content-center max-w-2xl gap-4 w-full">
        {EVENTS.map((event, i) => (
          <li key={i} className="w-full max-w-xs" onClick={() => {
            setIsLoading(true)
            setDecision(event.name)
            dispatch(openLogExerciseForm())
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
