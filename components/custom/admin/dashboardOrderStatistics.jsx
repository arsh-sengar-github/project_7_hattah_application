"use client";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const description = "A bar chart";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#E27C20",
  },
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DashboardOrderStatistics() {
  const { data: statistics, loading } = useFetch(
    "/api/dashboard/admin/statistics"
  );
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (statistics && statistics.success) {
      const currChartData = months.map((month, index) => {
        const monthData = statistics.data.find(
          (currMonthData) => currMonthData._id.month === index + 1
        );
        return {
          month: month,
          amount: monthData ? monthData.sales : 0,
        };
      });
      setChartData(currChartData);
    }
  }, [statistics]);
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
