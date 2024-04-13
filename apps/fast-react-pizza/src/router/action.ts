import { ActionFunction, redirect } from "react-router-dom";
import { createOrder, updateOrder } from "../services/apiRestaurant";
import { clearCart } from "../features/cart/cartSlice";
import store from "../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export const createOrderAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as any;
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {} as { [key: string]: string };
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export const updateOrderAction: ActionFunction = async ({ params }) => {
  const data = { priority: true };
  await updateOrder(params?.orderId || "", data);
  return null;
};
