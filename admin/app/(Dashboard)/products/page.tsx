import { Suspense } from "react";
import Products from "@/components/products";
import Protected from "@/components/protected";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p>Loading products…</p>}>
      <Protected>
        <Products />
      </Protected>
    </Suspense>
  );
}
