import { useRef, useState, type ChangeEvent } from "react";
import { MapPin, Plus, Search } from "lucide-react";
import { useCities } from "../context/cities";
import type { CityData, CityDataApiResponse } from "../types/CityData";

function CitySearch() {
  const { addCity } = useCities();
  const [results, setResults] = useState<CityData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    if (newQuery.length < 3) {
      setResults((prev) => (prev.length > 0 ? [] : prev));
      return;
    }

    const fetchCities = async () => {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${newQuery}`,
      );
      const data: CityDataApiResponse = await res.json();
      setResults(data.results ?? []);
    };

    fetchCities();
  };

  const handleAddCityClick = (city: CityData) => {
    addCity(city);
    setResults([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        ref={inputRef}
        onChange={handleSearch}
        type="search"
        placeholder="Search for a city..."
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500"
      />

      {results.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {results.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => handleAddCityClick(result)}
                className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <MapPin className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-500 dark:text-slate-500" />
                <span className="flex-1">
                  {result.name}
                  <span className="text-slate-400 dark:text-slate-500">
                    , {result.country}
                  </span>
                </span>
                <Plus className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-500 dark:text-slate-500" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;
