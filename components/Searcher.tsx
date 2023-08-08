import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import FuzzySearch from "fuzzy-search";

export const Searcher = ({
  search,
  setSearch,
  placeholder = "incline bench press",
}: {
  search: string,
  setSearch: (search: string) => void
  placeholder?: string
}) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm)
  }

  return (
    <div className="relative bg-white border border-gray-500 rounded-lg  mx-auto grid w-64">
      <Input variant="glass" size="search" placeholder={placeholder} className="text-left h-fit w-full" type="search" value={search} onChange={handleSearchChange} />
      <SearchIcon size="18" className="absolute top-1/2 right-2 transform  -translate-y-1/2 text-gray-500 dark:text-white" />
    </div>
  )
}




