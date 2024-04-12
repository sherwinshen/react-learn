import { createContext } from "react";
import { CityContextT } from "../type";

const CitiesContext = createContext<CityContextT>({
  isLoading: false,
  cities: [],
  currentCity: null,
});

export default CitiesContext;
