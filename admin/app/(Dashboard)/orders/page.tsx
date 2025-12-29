import OrderComponent from "@/components/order-component";

export default function Orders() {
  return (
    <div className="min-w-0 px-6 py-4">
      <p className="font-raleway text-lg font-semibold tracking-wider capitalize">
        orders
      </p>
      <OrderComponent />
    </div>
  );
}
