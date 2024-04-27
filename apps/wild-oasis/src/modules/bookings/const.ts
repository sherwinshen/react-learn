import { BOOKING_STATUS } from "./type";

export const statusToTagName = {
  [BOOKING_STATUS.unconfirmed]: "blue",
  [BOOKING_STATUS["checked-in"]]: "green",
  [BOOKING_STATUS["checked-out"]]: "silver",
};
