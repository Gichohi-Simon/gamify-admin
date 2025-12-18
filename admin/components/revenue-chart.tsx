import React from "react";
import { MonthlyRevenueChart } from "./monthy-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RevenueChart() {
  return (
    <div className="mt-8">
      <p className="font-raleway overflow-x-hidden pb-4 font-semibold tracking-wider">
        Annual Revenue
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="font-raleway text-sm">Annual Revenue</CardTitle>
        </CardHeader>

        <CardContent>
          <MonthlyRevenueChart />
        </CardContent>
      </Card>
    </div>
  );
}
