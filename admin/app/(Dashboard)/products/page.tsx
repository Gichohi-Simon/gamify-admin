"use client";

import Pagination from "@/components/pagination";
import ProductList from "@/components/product-list";
import { useProducts } from "@/hooks/products";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);
  const query = params.get("q") || "";
  const { data } = useProducts({
    page,
    limit: 8,
    query,
  });
  return (
    <div>
      <ProductList products={data?.products ?? []} />
      <Pagination
        currentPage={data?.currentPage ?? 1}
        totalPages={data?.totalPages ?? 1}
      />
    </div>
  );
}
