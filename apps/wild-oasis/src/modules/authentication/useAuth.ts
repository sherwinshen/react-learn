import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../services/queryClient";
import { fetchCurrentUser, fetchLogin, fetchLogout, fetchSignUp, fetchUpdateCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAuth() {
  const { isLoading, data: user } = useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: fetchCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => fetchLogin({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return {
    isLoggingIn,
    login,
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: () => fetchLogout(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return {
    isLoggingOut,
    logout,
  };
}

export function useSignUp() {
  const { isPending: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: fetchSignUp,
    onSuccess: () => {
      toast.success("Account successfully created! Please verify the new account from the user's email address.");
    },
  });

  return {
    isSigningUp,
    signUp,
  };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: fetchUpdateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData([QUERY_KEYS.user], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isUpdating,
    updateUser,
  };
}
