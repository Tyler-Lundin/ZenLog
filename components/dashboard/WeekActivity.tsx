"use client"
import { setDate } from "@/_store/slices/dashboardSlice"
import useUserWeek from "@/hooks/useUserWeek"
import { getWeekday } from "@/lib/utils"
import { DateObject } from "@/types/global"
import { UserDay } from "@prisma/client"
import { useDispatch } from "react-redux"
import { cn } from "@/lib/utils"
import { BsTriangle } from "react-icons/bs"

export default function WeekActivity() {
  const { week, month: activeMonth, day: activeDay, year: activeYear, isLoading, isError } = useUserWeek()
  const isActiveDay = (day: UserDay | DateObject) => day.day === activeDay && day.month === activeMonth && day.year === activeYear
  const doesItHaveActivity = (day: UserDay | DateObject) => {
    if (!('id' in day)) return {
      exercise: false,
      food: false,
      water: false,
      journal: false,
      mood: false,
      sleep: false,
      meditate: false,
      bodyweight: false,
      hasActivity: false
    }
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
      vitals: day.BodyweightEntries.length > 0 || day.SleepEntries.length > 0 || day.MoodEntries.length > 0,
      hasActivity
    }
  }
  const dispatch = useDispatch()

  if (isError) return <p className="text-red-400">Failed to load</p>

  return (
    <div className="grid grid-cols-7 justify-content-center dark:text-white content-start px-1 bg-gradient-to-b from-white via-white to-white/0 dark:from-black dark:via-black dark:to-black/0  py-2">
      {week.map((day: UserDay | DateObject, index) => {
        const isUserDay = 'id' in day;
        const isActive = isActiveDay(day);
        const isToday = day.day === new Date().getDate() && day.month === new Date().getMonth() + 1 && day.year === new Date().getFullYear();
        const pastDay = day.year < new Date().getFullYear() || day.month < new Date().getMonth() + 1 || day.day < new Date().getDate();

        let activityColor = '';
        if (isUserDay) {
          const { exercise, mood, sleep, bodyweight, vitals } = doesItHaveActivity(day as UserDay);
          if (exercise || mood || sleep || bodyweight) {
            activityColor = "bg-green-400 dark:bg-green-500 text-black dark:text-black green";
          }
        }

        return (
          <>
            <button
              onClick={() => dispatch(setDate(day))}
              className={cn(
                " transition-all grid place-content-center  bg-white dark:bg-black  dark:text-white relative py-1",
                {
                  "bg-white dark:bg-black": pastDay,
                  "border-b border-black dark:border-white": isActive,
                  // "border-2 border-black dark:border-yellow-300": isToday,
                  // [activityColor]: isUserDay,
                }
              )}
              key={isUserDay ? day.id : `${day.day}-${day.month}-${day.year}`}
            >
              {isToday && <BsTriangle size="15" className={`absolute -translate-y-full left-1/2 transition-all duration-500 -translate-x-1/2 rotate-180 -z-0 ${isActive ? "translate-y-10 opacity-0" : "opacity-100"}`} />}
              <div className="w-full flex justify-center items-center bg-white dark:bg-black">
                {isUserDay && doesItHaveActivity(day).exercise && <div className="w-2 h-2 rounded-full bg-green-400 dark:bg-green-500"></div>}
                {isUserDay && doesItHaveActivity(day).vitals && <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500"></div>}
              </div>
              {isToday && <span className="text-xs ">Today</span>}
              {isActive ? (
                <div className="grid sm:flex items-center">
                  <h2 className=" text-sm sm:text-lg font-thin lowercase">{getWeekday(day)}</h2>
                  <span className="text-xs sm:ml-1">{day.day}</span>
                </div>
              ) : (
                <div className="grid sm:flex items-center">
                  <h2 className=" text-sm sm:text-lg font-thin lowercase">{getWeekday(day)}</h2>
                  <span className="text-xs sm:ml-1">{day.day}</span>
                </div>
              )}
            </button>
          </>
        );
      })}
    </div>
  );
}
