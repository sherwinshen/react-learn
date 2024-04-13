import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { ButtonType } from "../../type";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: {
  pizzaId: number;
  currentQuantity: number;
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type={ButtonType.round}
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={ButtonType.round}
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
