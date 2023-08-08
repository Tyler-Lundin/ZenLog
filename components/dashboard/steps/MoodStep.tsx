"use client"
import { AppDispatch, RootState } from "@/_store"
import { setMood } from "@/_store/slices/dashboardSlice";
import { Searcher } from "@/components/Searcher";
import { Button } from "@/components/ui/button";
import { MOODS } from "@/configs/moods.config";
import { Mood } from "@prisma/client"
import FuzzySearch from "fuzzy-search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"



export default function MoodStep() {
  const { mood } = useSelector((state: RootState) => state.dashboard.dailyEntries);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");

  const searcher = new FuzzySearch(MOODS, ["name"], { caseSensitive: false, sort: true });
  const moods = searcher.search(search)

  return (
    <>
      <div className="fixed w-screen top-0 left-0 z-40 h-24">
        <h1 className="text-center text-black dark:text-white text-3xl md:text-6xl font-black">MOOD</h1>
        <Searcher search={search} setSearch={setSearch} placeholder="Spaghetti Upsetti" />
      </div>
      <div className="fixed h-screen left-1/2 w-3/4 top-20 md:top-24 -translate-x-1/2 overflow-y-auto">
        <div className="relative grid place-content-center rounded-lg text-white pt-2 w-full gap-2">
          {moods.map(M => (
            <Button
              size="xl"
              className={`w-full px-4 py-2 grid grid-cols-4 justify-start text-black hover:text-white dark:text-white dark:hover:text-black transition-all rounded-full group overflow-hidden border border-gray-500 ${mood.value === M.value && "dark:bg-white dark:text-black bg-black text-white font-bold"}`}
              key={M.value}
              onClick={() => dispatch(setMood(M.value as Mood))}
            >
              <p className="text-sm lg:text-xl uppercase col-span-3">{M.name}</p>
              <p className={`text-2xl px-2 transition-all group-hover:-translate-y-1/4  ${M.value === mood.value && 'animate-bounce'}`}>{M.icon}</p>
            </Button>
          ))}
        </div>
        <span className="h-28 block" />
      </div>
    </>
  )
}
