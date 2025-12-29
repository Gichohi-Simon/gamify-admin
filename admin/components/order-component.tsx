"use client";
import { useGetAllOrders } from "@/hooks/order";
import Link from "next/link";
import { OrderInterface } from "@/types/types";
import NoOrders from "./no-orders";

export default function OrderComponent() {
  const { data: orders } = useGetAllOrders();
  return (
    <div>
      {orders && orders.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr className="font-raleway">
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Invoice No.
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  VAT
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Shipping
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Payment
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Delivery
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Total
                </th>
                <th className="px-4 py-3 text-xs font-semibold md:text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order: OrderInterface) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="font-raleway px-4 py-3 text-[10px] font-semibold md:text-xs">
                    {order.invoiceNumber}
                  </td>

                  <td className="font-inter px-4 py-3 text-[10px] md:text-xs">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(order.createdAt))}
                  </td>

                  <td className="font-inter px-4 py-3 text-[10px] md:text-xs">
                    Ksh {Number(order.taxPrice).toLocaleString()}
                  </td>

                  <td className="font-inter px-4 py-3 text-[10px] md:text-xs">
                    Ksh {Number(order.shippingPrice).toLocaleString()}
                  </td>

                  <td className="font-raleway px-4 py-3">
                    {order.isPaid ? (
                      <span className="rounded bg-green-400 px-2 py-1 text-[10px] md:text-xs">
                        Paid
                      </span>
                    ) : (
                      <span className="rounded bg-red-400 px-2 py-1 text-[10px] md:text-xs">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="font-raleway px-4 py-3">
                    {order.isDelivered ? (
                      <span className="rounded bg-green-400 px-2 py-1 text-[10px] md:text-xs">
                        Delivered
                      </span>
                    ) : (
                      <span className="rounded bg-red-400 px-2 py-1 text-[10px] md:text-xs">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="font-inter px-4 py-3 text-[10px] font-bold md:text-xs">
                    Ksh {Number(order.totalPrice).toLocaleString()}
                  </td>

                  <td className="font-raleway px-4 py-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="bg-primary rounded-full px-3 py-1 text-[10px] text-white transition hover:bg-black md:text-xs"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoOrders />
      )}
    </div>
  );
}
