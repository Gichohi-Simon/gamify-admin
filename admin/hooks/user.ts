import { getAllUsers } from "@/lib/api/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
};
