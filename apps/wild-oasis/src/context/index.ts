import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error("Context was used outside the provider");
  return context;
}
