"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", String(page));

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="font-raleway flex items-center justify-center gap-3 pb-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`bg-primary rounded-md border px-2 py-1 text-[10px] md:text-xs ${
          currentPage <= 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      <span className="text-[10px] font-medium text-gray-700 md:text-xs">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`bg-primary rounded-md border px-2 py-1 text-[10px] md:text-xs ${
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
