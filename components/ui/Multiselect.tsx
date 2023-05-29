'use client'

import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select"
import { AiOutlineClose } from "react-icons/ai"
import { Button } from "./button"

interface MultiSelectProps {
  options: string[],
  label: string,
}


export default function MultiSelect({ options, label }: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([])
  const handleClick = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  return (
    <>
      <div className="flex flex-wrap h-12 dark:bg-black bg-white rounded-lg items-center">
        {selected.map((item) => (
          <div className="border border-black dark:border-white h-fit rounded-full px-2 py-1 m-1" key={`${item}-multiselect`}>
            <span className=" dark:text-white "> {item}</span>
            <AiOutlineClose className="inline ml-1" onClick={() => handleClick(item)} />
          </div>
        ))}
      </div>
      <ul className="h-40 overflow-y-auto bg-gray-200 border border-black p-2 w-full grid gap-2">
        {options.map((option) => {
          if (selected.includes(option)) return null
          return (
            <li key={`${option}-multiselect`} onClick={() => handleClick(option)} className="cursor-pointer">
              <Button variant="ghost" className="dark:border-white dark:text-white border-black border bg-white">{option}</Button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
