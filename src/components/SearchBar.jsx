
import { Search } from "lucide-react"

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="search-bar">
            <Search size={20} />

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                aria-label="Search movies by title"
            />

        </div>
    )
}

export default SearchBar
