import React from "react";

export default function NoOrders() {
  return (
    <div className="font-raleway mt-5 rounded-lg bg-gray-100 py-12 md:mt-8">
      <p className="text-center text-sm font-bold capitalize md:text-base">
        no orders yet
      </p>
      <p className="mt-3 text-center text-xs lowercase md:text-sm">
        wait for customers to place orders
      </p>
    </div>
  );
}
