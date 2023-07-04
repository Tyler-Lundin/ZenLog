import { Input } from "./ui/input";
import { IoBarbell } from "react-icons/io5";

export const Searcher = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm)
  }

  return (
    <div className="grid items-center relative w-full">
      <div className="relative border-b dark:border-white border-black mx-auto grid w-full ">
        <Input variant="glass" size="search" placeholder="incline bench press" className="border-t border-white text-center" type="search" value={search} onChange={handleSearchChange} />
        <span className="text-sm absolute right-2 bottom-0 dark:text-white">exercise search</span>
        <IoBarbell className="absolute left-2 bottom-1 text-2xl dark:text-white" />
      </div>
    </div>
  )
}




