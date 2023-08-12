"use client"
import { setDate } from "@/_store/slices/dashboardSlice"
import useUserWeek from "@/hooks/useUserWeek"
import { getWeekday } from "@/lib/utils"
import { DateObject } from "@/types/global"
import { UserDay } from "@prisma/client"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { cn } from "@/lib/utils"


export default function WeekActivity() {

  const { userWeek, month: activeMonth, day: activeDay, year: activeYear, weekOfYear } = useUserWeek()
  const isActiveDay = (day: UserDay | DateObject) => day.day === activeDay && day.month === activeMonth && day.year === activeYear
  const dayHasActivity = (day: UserDay) => {
    const hasActivity = day.BodyweightEntries.length > 0 || day.SleepEntries.length > 0 || day.MoodEntries.length > 0 || day.ExerciseEntries.length > 0 || day.FoodEntries.length > 0 || day.WaterEntries.length > 0 || day.JournalEntries.length > 0 || day.MeditateEntries.length > 0
    return {
      exercise: day.ExerciseEntries.length > 0,
      food: day.FoodEntries.length > 0,
      water: day.WaterEntries.length > 0,
      journal: day.JournalEntries.length > 0,
      mood: day.MoodEntries.length > 0,
      sleep: day.SleepEntries.length > 0,
      meditate: day.MeditateEntries.length > 0,
      bodyweight: day.BodyweightEntries.length > 0,
      hasActivity
    }
  }
  const dispatch = useDispatch()

  const selectedDates: DateObject[] = useMemo(() => {
    console.log("useMemo run")
    const selectedDateMinusX = (x: number) => {
      const date = new Date(+activeYear, +activeMonth - 1, +activeDay)
      date.setDate(date.getDate() - x)
      return { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear(), weekday: getWeekday(date) }
    }
    return [
      selectedDateMinusX(3),
      selectedDateMinusX(2),
      selectedDateMinusX(1),
      { month: +activeMonth, day: +activeDay, year: +activeYear, weekday: getWeekday(new Date(+activeYear, +activeMonth - 1, +activeDay)) },
      selectedDateMinusX(-1),
      selectedDateMinusX(-2),
      selectedDateMinusX(-3),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay, activeMonth, activeYear]) //should only update when weekOfYear changes

  const fullWeek = selectedDates.map(defaultDay => {
    const foundDay = userWeek.find(
      (userDay: UserDay) => userDay.year === defaultDay.year && userDay.month === defaultDay.month && userDay.day === defaultDay.day
    );
    return foundDay || defaultDay;
  });

  const DAYS_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="grid grid-cols-7  justify-content-center gap-1 dark:text-white content-start">
      {fullWeek.map((day: UserDay | DateObject) => {
        const isUserDay = 'id' in day;
        const isActive = isActiveDay(day);
        const isToday = day.day === new Date().getDate() && day.month === new Date().getMonth() + 1 && day.year === new Date().getFullYear()
        if (!isUserDay) {
          return (
            <button onClick={() => dispatch(setDate(day))}
              className={cn("rounded-b-md h-4 transition-all grid place-content-center bg-zinc-300 dark:bg-zinc-800 dark:text-white", {
                "bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black": isToday,
                "h-6": isActive,
              })}
              key={`${day.day}-${day.month}-${day.year}`}>
              <div className="text-center text-xs">{getWeekday(day).slice(0, 3)}</div>
            </button>
          );
        }
        const Activity = dayHasActivity(day);
        return (
          <button onClick={() => dispatch(setDate(day))}
            className={cn("rounded-b-md h-4 transition-all grid place-content-center bg-zinc-300 dark:bg-zinc-800 dark:text-white", {
              "bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black": isToday,
              "h-6": isActive,
              "bg-green-400 dark:bg-green-400 text-black dark:text-black": Activity.exercise,
            })}
            key={day.id}>
            <div className="text-center text-xs">{getWeekday(day).slice(0, 3)}</div>
          </button>
        )
      })}
    </div>
  )
}



