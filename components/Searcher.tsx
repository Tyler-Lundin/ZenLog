import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export const Searcher = ({ search, setSearch }: { search: string, setSearch: (search: string) => void }) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm)
  }

  return (
    <div className="grid items-center relative w-screen px-16">
      <div className="relative bg-white dark:bg-black border rounded-full border-black/20 dark:border-white/20 border-black mx-auto grid w-full px-8">
        <Input variant="glass" size="search" placeholder="incline bench press" className="text-center py-1 h-fit" type="search" value={search} onChange={handleSearchChange} />
        <SearchIcon className="absolute top-1/2 right-4 transform  -translate-y-1/2 text-gray-500 dark:text-white" />
      </div>
    </div>
  )
}




