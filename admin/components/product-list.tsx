"use client";

import Link from "next/link";
import Image from "next/image";
import { EyeIcon, PlusCircleIcon } from "lucide-react";
import { ProductInterface } from "@/types/types";
import SectionTitle from "./section-title";

export default function ProductList({
  products,
}: {
  products: ProductInterface[];
}) {
  return (
    <div className="mt-6 md:mt-6">
      <div className="flex justify-between px-5">
        <SectionTitle>products</SectionTitle>
        <Link
          href="/create-product"
          className="font-raleways bg-primary flex items-center justify-between gap-2 rounded px-2 py-2 lowercase"
        >
          <PlusCircleIcon className="h-4 w-4" />
          <p className="text-xs">create product</p>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="mx-[15px] grid w-full grid-cols-2 gap-6 pt-6 pb-10 md:mx-5 md:grid-cols-4 md:gap-10 md:pt-8 md:pb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="hover:border-primary flex flex-col rounded-sm border px-4 py-3 shadow-md"
            >
              <div className="flex w-full items-center justify-between">
                <span className="bg-primary font-raleway rounded px-2 py-1 text-[8px] font-bold capitalize">
                  {product.category}
                </span>

                <div className="hover:bg-primary rounded-full border border-black p-2">
                  <Link href={`/shop/${product.id}`}>
                    <EyeIcon className="size-2 md:size-3" />
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto mt-3 h-20 w-full max-w-20 cursor-pointer overflow-hidden rounded-lg md:h-44 md:max-w-[140px]">
                <Link href={`/shop/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="transform object-contain transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 260px"
                  />
                </Link>
              </div>

              <div className="mt-2 w-full text-start">
                <span className="font-raleway line-clamp-1 block text-[10px] font-bold tracking-wider capitalize md:text-xs">
                  {product.name}
                </span>
                <span className="font-inter mt-2 block text-[10px] md:text-xs">
                  ksh {Number(product.price).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
