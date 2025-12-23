import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllOrders,
  getUserOrderById,
  getTotalNumberOfOrders,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "@/lib/api/order.api";

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

export const useGetTotalNumberOfOrders = () => {
  return useQuery({
    queryKey: ["totalOrders"],
    queryFn: getTotalNumberOfOrders,
  });
};

export const useMarkOrderAsDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markOrderAsDelivered(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useMarkOrderAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markOrderAsPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
