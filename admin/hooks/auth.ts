import { signIn, signOut, signUp, checkAuth } from "@/lib/api/auth.api";
import { setLogout } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      dispatch(setLogout());
    },
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 0,
    gcTime: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
