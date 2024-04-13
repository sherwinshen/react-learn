import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
  
export type StoreStateT = ReturnType<typeof store.getState>;
