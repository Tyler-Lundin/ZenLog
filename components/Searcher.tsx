import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export const Searcher = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm)
  }

  return (
    <div className="grid items-center relative w-full">
      <div className="relative border-b border-t dark:border-white/50 border-black mx-auto grid w-full ">
        <Input variant="glass" size="search" placeholder="incline bench press" className="text-center" type="search" value={search} onChange={handleSearchChange} />
        <SearchIcon className="absolute top-1/2 right-4 transform  -translate-y-1/2 text-gray-500 dark:text-white" />
      </div>
    </div>
  )
}




