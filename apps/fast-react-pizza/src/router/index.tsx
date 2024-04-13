import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../ui/AppLayout";
import Error from "../ui/Error";
import Home from "../ui/Home";
import Menu from "../features/menu/Menu";
import { menuLoader, orderLoader } from "./loader";
import Order from "../features/order/Order";
import Cart from "../features/cart/Cart";
import CreateOrder from "../features/order/CreateOrder";
import { createOrderAction, updateOrderAction } from "./action";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
