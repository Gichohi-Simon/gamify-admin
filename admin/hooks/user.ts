import {
  getAllUsers,
  getBannedUsers,
  getSingleUserById,
  getTotalUsers,
  banUserFromPlatform,
  restoreBannedUser,
  makeUserAnAdmin,
  revokeUserAdminPriviledge,
} from "@/lib/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useGetSingleUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUserById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};

export const useGetTotalUsers = () => {
  return useQuery({
    queryKey: ["totalUsers"],
    queryFn: getTotalUsers,
  });
};

export const useGetBannedUsers = () => {
  return useQuery({
    queryKey: ["bannedUsers"],
    queryFn: getBannedUsers,
  });
};

export const useBanUserFromPlatform = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: banUserFromPlatform,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["bannedUsers"] });
    },
  });
};

export const useRestoreBannedUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreBannedUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["bannedUsers"] });
    },
  });
};

export const useMakeUserAnAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeUserAnAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useRevokeUserAsAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeUserAdminPriviledge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
