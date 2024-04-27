export enum BOOKING_STATUS {
  "unconfirmed" = "unconfirmed",
  "checked-in" = "checked-in",
  "checked-out" = "checked-out",
}
export type BookingDataT = {
  id: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  status: BOOKING_STATUS;
};

export type BookingDetailT = {
  id: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  status: BOOKING_STATUS;
  cabinPrice: number;
  extraPrice: number;
  created_at: string;
  isPaid: boolean;
  hasBreakfast: boolean;
  numGuests: number;
  observations: string;
};
