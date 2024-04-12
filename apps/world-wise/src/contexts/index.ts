import { useContext } from "react";
import CitiesContext from "./CitiesContext";
import AuthContext from "./AuthContext";

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}
