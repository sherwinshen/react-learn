import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import CabinAdd from "../pages/CabinAdd";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/cabins/add",
        element: <CabinAdd />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
