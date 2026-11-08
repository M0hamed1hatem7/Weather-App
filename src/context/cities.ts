import { createContext, useContext } from "react";
import type { CityData } from "../types/CityData";

export type NewCity = Omit<CityData, "updatedAt">;

export type CitiesContextValue = {
  cities: CityData[];
  addCity: (city: NewCity) => void;
  deleteCity: (city: CityData) => void;
  secondsUntilRefresh: number;
};

export const CitiesContext = createContext<CitiesContextValue | null>(null);

export function useCities(): CitiesContextValue {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}
