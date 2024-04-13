export enum ButtonType {
  primary = "primary",
  small = "small",
  round = "round",
  secondary = "secondary",
}

export type PizzaItemT = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type CartItemT = {
  pizzaId: number;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};

export type OrderItemT = {
  id: number;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartItemT[];
};
