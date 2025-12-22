import { ProductResponse, ProductInterface } from "@/types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async ({
  page = 1,
  limit = 8,
  query = "",
}): Promise<ProductResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (query) params.append("q", query);
  const response = await fetch(`${API}/product/all-products?${params}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to fetch products");
  }
  const data = await response.json();
  return data;
};

export const getSingleProduct = async (
  id: string,
): Promise<ProductInterface> => {
  const response = await fetch(`${API}/product/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to get single product",
    );
  }
  const data: { singleProduct: ProductInterface } = await response.json();
  return data.singleProduct;
};

export const deleteSingleProduct = async (id: string): Promise<string> => {
  const response = await fetch(`${API}/product/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to delete product");
  }
  const data: { message: string } = await response.json();
  return data.message;
};

export const createProduct = async (
  formData: FormData,
): Promise<ProductInterface> => {
  const response = await fetch(`${API}/product/create-product`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create product");
  }
  const data: { newProduct: ProductInterface } = await response.json();
  return data.newProduct;
};
