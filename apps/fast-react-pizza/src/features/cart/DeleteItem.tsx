import { useAppDispatch } from "../../store";
import { ButtonType } from "../../type";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch();

  return (
    <Button
      type={ButtonType.small}
      onClick={() => dispatch(deleteItem(pizzaId))}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
