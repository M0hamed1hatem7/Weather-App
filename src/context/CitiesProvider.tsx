import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CityData } from "../types/CityData";
import { CitiesContext, type NewCity } from "./cities";
import { useToast } from "./toast";

const REFRESH_INTERVAL_SECONDS = 15;

export function CitiesProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [cities, setCities] = useState<CityData[]>([]);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(
    REFRESH_INTERVAL_SECONDS,
  );
  const secondsRef = useRef(REFRESH_INTERVAL_SECONDS);

  const resetCountdown = useCallback(() => {
    secondsRef.current = REFRESH_INTERVAL_SECONDS;
    setSecondsUntilRefresh(REFRESH_INTERVAL_SECONDS);
  }, []);

  const addCity = useCallback(
    (city: NewCity) => {
      setCities((prev) => [...prev, { ...city, updatedAt: new Date() }]);
      resetCountdown();
      showToast({
        message: `${city.name} was added to your dashboard.`,
        variant: "success",
      });
    },
    [resetCountdown, showToast],
  );

  const deleteCity = useCallback(
    (city: CityData) => {
      setCities((prev) => prev.filter((item) => item.id !== city.id));
      showToast({
        message: `${city.name} was removed from your dashboard.`,
        variant: "info",
      });
    },
    [showToast],
  );

  const citiesCount = cities.length;

  useEffect(() => {
    if (citiesCount === 0) {
      return;
    }

    const interval = setInterval(() => {
      secondsRef.current -= 1;

      if (secondsRef.current <= 0) {
        secondsRef.current = REFRESH_INTERVAL_SECONDS;

        const now = new Date();
        setCities((prev) =>
          prev.map((city) => ({ ...city, updatedAt: now })),
        );
        showToast({
          message: `Weather updated for ${citiesCount} ${
            citiesCount === 1 ? "city" : "cities"
          }.`,
          variant: "info",
        });
      }

      setSecondsUntilRefresh(secondsRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, [citiesCount, showToast]);

  const value = useMemo(
    () => ({ cities, addCity, deleteCity, secondsUntilRefresh }),
    [cities, addCity, deleteCity, secondsUntilRefresh],
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}
