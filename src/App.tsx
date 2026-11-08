import { Search } from "lucide-react";
import CitySearch from "./components/CitySearch";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import { useCities } from "./context/cities";

function App() {
  const { cities } = useCities();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Header />
        <CitySearch />

        {cities.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white/50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <Search className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">
                No cities yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Search above to add your first city.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cities.map((city) => (
              <WeatherCard key={city.id} city={city} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
