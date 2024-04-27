import { PAGE_SIZE } from "../const";
import { BOOKING_STATUS, BookingDataT } from "../modules/bookings/type";
import supabase from "./supabase";

export async function fetchGetBookings({
  sortby,
  filter,
  page,
}: {
  sortby?: { field: string; direction: string };
  filter?: { method?: string; field: string; value: string } | null;
  page?: number;
}): Promise<{ data: BookingDataT[]; count: number }> {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );
  // FILTER
  if (filter) query = query?.[filter.method || "eq"](filter.field, filter.value);
  // SORT
  if (sortby) query = query.order(sortby.field, { ascending: sortby.direction === "asc" });
  // PAGE
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return {
    data,
    count,
  };
}

export async function fetchGetBooking(id: number) {
  const { data, error } = await supabase.from("bookings").select("*, cabins(*), guests(*)").eq("id", id).single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

export async function fetchDeleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function fetchUpdateBooking(
  id: number,
  obj: {
    status?: BOOKING_STATUS;
    isPaid?: boolean;
    hasBreakfast?: boolean;
    extraPrice?: number;
    totalPrice?: number;
  }
) {
  const { data, error } = await supabase.from("bookings").update(obj).eq("id", id).select().single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  return data;
}
