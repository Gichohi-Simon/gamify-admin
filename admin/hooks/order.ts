import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllOrders, getUserOrderById } from "@/lib/api/order.api";

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};

export const useGetUserOrderById = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getUserOrderById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};
