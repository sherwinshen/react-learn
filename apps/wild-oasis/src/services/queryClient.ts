import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default queryClient;

export const QUERY_KEYS = {
  settings: "settings",
  cabins: "cabins",
};
