import { OrderInterface, Order } from "@/types/types";
const API = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (): Promise<OrderInterface[]> => {
  const response = await fetch(`${API}/order/allOrders`, {
    credentials: "include",
    cache: "no-store",
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
    cache: "no-store",
  });
  const data: { order: Order } = await response.json();
  return data.order;
};

export const getTotalNumberOfOrders = async (): Promise<number> => {
  const response = await fetch(`${API}/order/total-orders`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to get total orders",
    );
  }
  const data: { totalOrders: number } = await response.json();
  return data.totalOrders;
};

export const getTotalSales = async (): Promise<number> => {
  const response = await fetch(`${API}/order/total-sales`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "faied to get total sales");
  }
  const data: { totalSales: number } = await response.json();
  return data.totalSales;
};

export const markOrderAsDelivered = async (id: string): Promise<Order> => {
  const response = await fetch(`${API}/order/mark-as-delivered/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || error.message || "failed to mark order as delivered",
    );
  }
  const data: { delivered: Order } = await response.json();
  return data.delivered;
};
