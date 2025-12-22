import { OrderInterface, Order } from "@/types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (): Promise<OrderInterface[]> => {
  const response = await fetch(`${API}/order/allOrders`, {
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "failed to fetch orders");
  }
  const data: { orders: OrderInterface[] } = await response.json();
  return data.orders;
};

export const getUserOrderById = async (id: string): Promise<Order> => {
  const response = await fetch(`${API}/order/get-user-order-by-id/${id}`, {
    credentials: "include",
  });
  const data: { order: Order } = await response.json();
  return data.order;
};
