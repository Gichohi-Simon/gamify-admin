import OrderComponent from "@/components/order-component";
import Protected from "@/components/protected";
import SectionTitle from "@/components/section-title";

export default function Orders() {
  return (
    <Protected>
      <div className="min-w-0 px-6 py-4">
        <SectionTitle>orders</SectionTitle>
        <OrderComponent />
      </div>
    </Protected>
  );
}
