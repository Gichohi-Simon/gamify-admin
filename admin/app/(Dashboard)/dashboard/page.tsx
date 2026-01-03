import React from "react";

import RevenueChart from "@/components/revenue-chart";
import Total from "@/components/totals";
import Protected from "@/components/protected";
import SectionTitle from "@/components/section-title";

export default function Home() {
  return (
    <div className="min-h-screen px-5 py-4">
      <Protected>
        <div className="mb-6">
          <SectionTitle>dashboard</SectionTitle>
        </div>
        <Total />
        <RevenueChart />
      </Protected>
    </div>
  );
}
