import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { fetchGetSettings, fetchUpdateSetting } from "../../services/apiSettings";
import { QUERY_KEYS } from "../../services/queryClient";

export function useGetSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.settings],
    queryFn: fetchGetSettings,
  });

  return {
    isLoading,
    data,
    error,
  };
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: fetchUpdateSetting,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.settings] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateSetting,
    isUpdating,
  };
}
