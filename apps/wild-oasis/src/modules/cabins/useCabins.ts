import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../services/queryClient";
import { fetchCreateCabin, fetchDeleteCabin, fetchGetCabins, fetchUpdateCabin } from "../../services/apiCabins";

export function useGetCabins() {
  const { isLoading, data, error } = useQuery({
    queryKey: [QUERY_KEYS.cabins],
    queryFn: fetchGetCabins,
  });

  return {
    isLoading,
    data,
    error,
  };
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: fetchCreateCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cabins] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    createCabin,
    isCreating,
  };
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: fetchUpdateCabin,
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cabins] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateCabin,
    isUpdating,
  };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: fetchDeleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cabins] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
