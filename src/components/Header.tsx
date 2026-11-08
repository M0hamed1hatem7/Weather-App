import { CloudSun, Moon, RefreshCw, Sun } from "lucide-react";
import { useCities } from "../context/cities";
import { useTheme } from "../context/theme";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { cities, secondsUntilRefresh } = useCities();
  const isDark = theme === "dark";
  const hasCities = cities.length > 0;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white p-2.5 text-sky-500 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <CloudSun className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Weather App Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-Time weather updates every 15 seconds for your favorite cities
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-red-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-red-400 dark:ring-slate-800"
          title={
            hasCities
              ? `Next weather update in ${secondsUntilRefresh} seconds`
              : "Add a city to start live updates"
          }
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          Live
          {hasCities && (
            <>
              <span className="h-3 w-px bg-red-200 dark:bg-red-500/30" />
              <span className="inline-flex items-center gap-1 tabular-nums text-slate-500 dark:text-slate-400">
                <RefreshCw className="h-3 w-3" />
                {secondsUntilRefresh}s
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            isDark ? "Switch to light theme" : "Switch to dark theme"
          }
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="rounded-full bg-white p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800 dark:hover:text-slate-100"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
