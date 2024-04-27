import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../services/queryClient";
import { fetchDeleteBooking, fetchGetBooking, fetchGetBookings } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../const";
import toast from "react-hot-toast";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };
  // SORT
  const sortbyValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortbyValue.split("-");
  const sortby = { field, direction };
  // PAGE
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: { data, count } = {} } = useQuery({
    queryKey: [QUERY_KEYS.bookings, filter, sortby, page],
    queryFn: () => fetchGetBookings({ sortby, filter, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.bookings, filter, sortby, page + 1],
      queryFn: () => fetchGetBookings({ sortby, filter, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.bookings, filter, sortby, page - 1],
      queryFn: () => fetchGetBookings({ sortby, filter, page: page - 1 }),
    });
  }

  return {
    isLoading,
    data,
    count,
  };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: fetchDeleteBooking,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.bookings],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}

export function useGetBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.booking, bookingId],
    queryFn: () => bookingId && fetchGetBooking(Number(bookingId)),
    retry: false,
  });

  return {
    isLoading,
    booking,
    error,
    refetch,
  };
}
