import Button from "../../components/button/Button";
import { useCheckOut } from "../check-in-out/useCheckInOut";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button variation="primary" size="small" onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
