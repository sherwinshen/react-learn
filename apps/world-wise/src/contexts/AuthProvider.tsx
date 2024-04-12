import { useReducer } from "react";
import AuthContext from "./AuthContext";
import { AuthStateT, UserT } from "../type";

const FAKE_USER = {
  name: "Sherwin",
  email: "sherwin_sw@163.com",
  password: "hello, world!",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state: AuthStateT, action: { type: string; payload?: UserT }): AuthStateT {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: FAKE_USER,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: undefined,
  });

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: "LOGIN", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
