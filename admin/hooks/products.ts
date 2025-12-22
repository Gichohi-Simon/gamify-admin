import {
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  createProduct,
  updateProduct,
} from "@/lib/api/products.api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type UpdateProductVariables = {
  id: string;
  formData: FormData;
};

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

export const useDeleteSingleProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSingleProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: UpdateProductVariables) =>
      updateProduct(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
