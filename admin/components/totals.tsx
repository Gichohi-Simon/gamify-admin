"use client";

import React from "react";
import {
  Banknote,
  User2,
  ShoppingBag,
  Box,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

import { useGetTotalNumberOfOrders, useGetTotalSales } from "@/hooks/order";
import { useGetTotalProducts } from "@/hooks/products";
import { useGetTotalUsers } from "@/hooks/user";

export default function Total() {
  const { data: totalSales } = useGetTotalSales();
  const { data: totalOrders } = useGetTotalNumberOfOrders();
  const { data: totalProducts } = useGetTotalProducts();
  const { data: totalUsers } = useGetTotalUsers();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-12">
      <div className="pointer-events-none rounded bg-gray-200 px-8 py-6">
        <span className="flex justify-between">
          <p className="font-raleway text-sm">Total revenue</p>
          <Banknote className="h-5 w-5" />
        </span>
        <span className="font-inter text-sm font-bold">
          KES {totalSales?.toLocaleString()}
        </span>
        <div className="font-inter mt-2 flex items-center gap-2 font-bold text-green-500">
          <p className="text-[10px]">10%</p>
          <span>
            <TrendingUp className="h-4 w-4" />
          </span>
        </div>
      </div>
      <Link href="/users">
        <div className="hover:bg-primary rounded bg-black px-8 py-6 text-white hover:cursor-pointer hover:text-black">
          <span className="flex justify-between">
            <p className="font-raleway text-sm">Total users</p>
            <User2 className="h-5 w-5" />
          </span>
          <span className="font-inter text-sm font-bold">
            {totalUsers?.toLocaleString()}
          </span>
          <div className="font-inter mt-2 flex items-center gap-2 font-bold text-green-500">
            <p className="text-[10px]">5%</p>
            <span>
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
      <Link href="/orders">
        <div className="hover:bg-primary rounded bg-black px-8 py-6 text-white hover:cursor-pointer hover:text-black">
          <span className="flex justify-between">
            <p className="font-raleway text-sm">Total orders</p>
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="font-inter text-sm font-bold">{totalOrders}</span>
          <div className="font-inter mt-2 flex items-center gap-2 font-bold text-red-500">
            <p className="text-[10px]">8%</p>
            <span>
              <TrendingDown className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
      <Link href="/products">
        <div className="hover:bg-primary rounded bg-black px-8 py-6 text-white hover:cursor-pointer hover:text-black">
          <span className="flex justify-between">
            <p className="font-raleway text-sm">Total products</p>
            <Box className="h-5 w-5" />
          </span>
          <span className="font-inter text-sm font-bold">
            {totalProducts?.toLocaleString()}
          </span>
          <div className="font-inter mt-2 flex items-center gap-2 font-bold text-green-500">
            <p className="text-[10px]">10%</p>
            <span>
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
