import { createContext } from "react";
import { AuthContextT } from "../type";

const AuthContext = createContext<AuthContextT>({
  user: undefined,
  isAuthenticated: false,
});

export default AuthContext;
