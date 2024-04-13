import { useAppDispatch, useAppSelector } from "../../store";
import { ButtonType } from "../../type";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type={ButtonType.primary}>
          Order pizzas
        </Button>

        <Button
          type={ButtonType.secondary}
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
