import { LoaderFunction } from "react-router-dom";
import { getMenu, getOrder } from "../services/apiRestaurant";

export const menuLoader = async () => {
  const menu = await getMenu();
  return menu;
};

export const orderLoader: LoaderFunction<{ orderId: number }> = async ({
  params,
}) => {
  const order = await getOrder(params?.orderId || "");
  return order;
};
