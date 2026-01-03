import React from "react";

import RevenueChart from "@/components/revenue-chart";
import Total from "@/components/totals";
import Protected from "@/components/protected";

export default function Home() {
  return (
    <div className="min-h-screen px-5 py-4">
      <Protected>
        <p className="font-raleway mb-4 text-lg font-semibold tracking-wider md:mb-8">
          Dashboard
        </p>
        <Total />
        <RevenueChart />
      </Protected>
    </div>
  );
}
