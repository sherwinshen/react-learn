import { Form, useActionData, useNavigation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice } from "../cart/cartSlice";
import Button from "../../ui/Button";
import { ButtonType } from "../../type";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const dispatch = useAppDispatch();
  const {
    username,
    address: userAddress,
    status: addressStatus,
    error: errorAddress,
    position,
  } = useAppSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const formErrors = useActionData() as {
    phone?: string;
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [address, setAddress] = useState(userAddress);
  const [withPriority, setWithPriority] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector(getTotalCartPrice);

  const handleGetAddress = async (e: MouseEvent) => {
    e.preventDefault();
    const { address } = await dispatch(fetchAddress()).unwrap();
    setAddress(address);
  };
  const handleSetAddress = (e: MouseEvent) => {
    e.preventDefault();
    setAddress(userAddress);
  };

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        {/* First Name */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        {/* Phone number */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        {/* Address */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              {!position.latitude && !position.longitude ? (
                <Button
                  disabled={isLoadingAddress}
                  type={ButtonType.small}
                  onClick={handleGetAddress}
                >
                  Get position
                </Button>
              ) : (
                <Button type={ButtonType.small} onClick={handleSetAddress}>
                  Set position
                </Button>
              )}
            </span>
          </div>
        </div>
        {/* priority */}
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button
            disabled={isSubmitting || isLoadingAddress}
            type={ButtonType.primary}
          >
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
