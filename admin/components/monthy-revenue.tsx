"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { monthlyRevenue } from "@/lib/revenue-data";

export function MonthlyRevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyRevenue}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={true}
            tick={{
              fontSize: 12,
              fontFamily: "var(--font-inter)",
              fontWeight: "bold",
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={true}
            tickFormatter={(value) => `KSh ${value / 1000}k`}
            tick={{
              fontSize: 12,
              fontFamily: "var(--font-inter)",
              fontWeight: "bold",
            }}
          />

          <Tooltip
            formatter={(value) =>
              typeof value === "number"
                ? [`KSh ${value.toLocaleString()}`, "Revenue"]
                : value
            }
            contentStyle={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="currentColor"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
