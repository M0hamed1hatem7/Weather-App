import { useEffect, useState } from "react";
import { Clock, Trash2, Wind } from "lucide-react";
import { useCities } from "../context/cities";
import type { CityData } from "../types/CityData";
import type { WeatherData } from "../types/WeatherData";
import { getWeatherDescription } from "../helpers/getWeatherDescription";
import { WeatherIcon } from "./WeatherIcon";

type Props = {
  city: CityData;
};

function WeatherCard({ city }: Props) {
  const { deleteCity } = useCities();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const code = weather?.current_weather.weathercode ?? 0;
  const windSpeed = Math.round(weather?.current_weather.windspeed ?? 0);
  const windUnit = weather?.current_weather_units.windspeed ?? "km/h";
  const updatedTime = city.updatedAt.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,
      );
      const data: WeatherData = await res.json();
      setWeather(data);
    };

    fetchWeather();
  }, [city.latitude, city.longitude, city.updatedAt]);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          {city.name}, {city.country}
        </h2>
        <button
          type="button"
          onClick={() => deleteCity(city)}
          aria-label={`Remove ${city.name}`}
          title={`Remove ${city.name}`}
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {Math.round(weather?.current_weather.temperature ?? 0)}°C
        </p>
        <div className="rounded-xl bg-sky-50 p-2.5 dark:bg-sky-500/10">
          <WeatherIcon code={code} className="h-8 w-8" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {getWeatherDescription(code)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <Wind className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          {windSpeed} {windUnit}
        </span>
      </div>

      <p
        className="mt-auto flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
        title={`Last updated at ${city.updatedAt.toLocaleString()}`}
      >
        <Clock className="h-3.5 w-3.5" />
        Updated
        <span className="font-medium">{updatedTime}</span>
      </p>
    </article>
  );
}

export default WeatherCard;
