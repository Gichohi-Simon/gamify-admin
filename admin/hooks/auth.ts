import { signOut, checkAuth, adminSignIn } from "@/lib/api/auth.api";
import { setLogout } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAdminSignIn = () => {
  return useMutation({
    mutationFn: adminSignIn,
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
