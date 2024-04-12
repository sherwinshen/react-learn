import { useCallback, useEffect, useReducer } from "react";
import { ActionT, CityItemT, CityStateT } from "../type";
import { fetchAddCity, fetchCities, fetchDeleteCity, fetchGetCity } from "../services";
import CitiesContext from "./CitiesContext";

function reducer(state: CityStateT, action: ActionT): CityStateT {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "unloading":
      return {
        ...state,
        isLoading: false,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload as CityItemT[],
        isLoading: false,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload as CityItemT,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload as CityItemT],
        currentCity: action.payload as CityItemT,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== (action.payload as number)),
        currentCity: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      throw new Error("Unknown action type");
  }
}

export default function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(reducer, {
    isLoading: false,
    cities: [],
    currentCity: null,
    error: "",
  });

  useEffect(() => {
    async function initCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetchCities();
        dispatch({ type: "cities/loaded", payload: res });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading the city..." });
      }
    }
    initCities();
  }, []);

  async function createCity(newCity: CityItemT) {
    dispatch({ type: "loading" });
    try {
      const data = await fetchAddCity(newCity);
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error creating the city..." });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      await fetchDeleteCity(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error deleting the city..." });
    }
  }

  const getCity = useCallback(
    async function getCity(id: string) {
      if (id === currentCity?.id) return;
      dispatch({ type: "loading" });
      try {
        const data = await fetchGetCity(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading the city..." });
      }
    },
    [currentCity?.id]
  );

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        error,
        createCity,
        deleteCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
