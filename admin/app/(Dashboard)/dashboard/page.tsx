import React from "react";

import RevenueChart from "@/components/revenue-chart";
import Total from "@/components/totals";

export default function Home() {
  return (
    <div className="min-h-screen px-5 py-4">
      <p className="font-raleway mb-4 text-lg font-semibold tracking-wider md:mb-8">
        Dashboard
      </p>
      <Total />
      <RevenueChart />
    </div>
  );
}
