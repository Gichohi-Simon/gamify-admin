import { getAllProducts, getSingleProduct } from "@/lib/api/products.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProducts = ({ page = 1, limit = 6, query = "" } = {}) => {
  return useQuery({
    queryKey: ["products", { page, limit, query }] as const,
    queryFn: () => getAllProducts({ page, limit, query }),
    placeholderData: keepPreviousData,
  });
};

export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
    staleTime: Infinity,
  });
};
