import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchUpdateBooking } from "../../services/apiBookings";
import { BOOKING_STATUS } from "../bookings/type";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId: number) =>
      fetchUpdateBooking(bookingId, {
        status: BOOKING_STATUS["checked-out"],
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return {
    isCheckingOut,
    checkOut,
  };
}

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: {
        hasBreakfast?: boolean;
        extraPrice?: number;
        totalPrice?: number;
      };
    }) =>
      fetchUpdateBooking(bookingId, {
        status: BOOKING_STATUS["checked-in"],
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return {
    isCheckingIn,
    checkIn,
  };
}
