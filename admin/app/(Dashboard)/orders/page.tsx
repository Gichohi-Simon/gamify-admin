import OrderComponent from "@/components/order-component";
import Protected from "@/components/protected";

export default function Orders() {
  return (
    <Protected>
      <div className="min-w-0 px-6 py-4">
        <p className="font-raleway text-lg font-semibold tracking-wider capitalize">
          orders
        </p>
        <OrderComponent />
      </div>
    </Protected>
  );
}
