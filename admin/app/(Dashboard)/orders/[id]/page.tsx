"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useGetUserOrderById } from "@/hooks/order";
import { ArrowLeftCircleIcon } from "lucide-react";
import { OrderInterface } from "@/types/types";
import Protected from "@/components/protected";

type OrderItemType = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string | number;
  product: {
    name: string;
    images: string[];
  };
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const {
    data: singleOrder,
    isLoading,
    isError,
  } = useGetUserOrderById(orderId);
  console.log("single order", singleOrder);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (isError || !singleOrder)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Error fetching order
      </div>
    );

  return (
    <Protected>
      <div className="font-raleway min-h-screen bg-gray-50 px-4 py-8 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="hover:text-primary flex items-center gap-2 text-xs text-gray-700 transition md:text-sm"
            >
              <ArrowLeftCircleIcon className="h-3 w-3 md:h-5 md:w-5" /> Back
            </button>
            <div className="text-right">
              <div className="text-xs text-gray-500">Placed</div>
              <div className="text-xs font-semibold md:text-sm">
                {new Date(singleOrder.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border-primary rounded-xl border-l-4 bg-white p-5 shadow-lg">
              <div className="mb-3">
                <div className="text-[10px] tracking-wide text-gray-500 uppercase md:text-xs">
                  Invoice
                </div>
                <div className="text-xs font-bold text-gray-800 md:text-sm">
                  {singleOrder.invoiceNumber}
                </div>
              </div>
              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500">Items Price</span>
                  <span className="font-medium">
                    KSh {Number(singleOrder.itemsPrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">
                    KSh {Number(singleOrder.taxPrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    KSh {Number(singleOrder.shippingPrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-3 font-semibold text-gray-800">
                  <span>Total</span>
                  <span className="text-xs md:text-sm">
                    KSh {Number(singleOrder.totalPrice).toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold md:text-xs ${
                      singleOrder.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {singleOrder.isPaid ? "Paid" : "Payment Pending"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold md:text-xs ${
                      singleOrder.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {singleOrder.isDelivered ? "Delivered" : "Not Delivered"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              {singleOrder.orderItems?.map((orderItem: OrderItemType) => (
                <div
                  key={orderItem.id}
                  className="border-primary flex items-center gap-4 rounded-xl border-l-4 bg-white p-4 shadow-md transition hover:shadow-lg"
                >
                  <div className="relative h-24 w-24 shrink-0">
                    <Image
                      src={orderItem.product.images[0]}
                      alt={orderItem.product.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-800 md:text-base">
                      {orderItem.product.name}
                    </h3>
                    <p className="mt-1 text-[10px] text-gray-500 md:text-xs">
                      Qty: {orderItem.quantity}
                    </p>
                  </div>
                  <div className="min-w-[100px] text-right">
                    <div className="text-xs text-gray-500 md:text-sm">
                      Price
                    </div>
                    <div className="font-semibold text-gray-800">
                      KSh {Number(orderItem.price).toLocaleString()}
                    </div>
                    <div className="mt-1 text-[10px] text-gray-400 md:text-xs">
                      Subtotal: KSh{" "}
                      {(
                        Number(orderItem.price) * orderItem.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}
