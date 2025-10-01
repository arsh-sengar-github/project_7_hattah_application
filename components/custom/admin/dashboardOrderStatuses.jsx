"use client";
import useFetch from "@/hooks/use-fetch";
import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

export const description = "A donut chart";

const chartConfig = {
  status: {
    label: "Status",
  },
  unverified: {
    label: "Unverified",
    color: "#FFA94D",
  },
  pending: {
    label: "Pending",
    color: "#FF8C42",
  },
  processing: {
    label: "Processing",
    color: "#E27C20",
  },
  shipped: {
    label: "Shipped",
    color: "#CC5C2D",
  },
  delivered: {
    label: "Delivered",
    color: "#B0413E",
  },
  cancelled: {
    label: "Cancelled",
    color: "#804000",
  },
};

export function DashboardOrderStatuses() {
  const { data: statuses, loading } = useFetch("/api/dashboard/admin/statuses");
  const [chartData, setChartData] = useState([]);
  const [individualStatusCount, setIndividualStatusCount] = useState();
  const [statusCount, setStatusCount] = useState(0);
  useEffect(() => {
    if (statuses && statuses.success) {
      const currChartData = statuses.data.map((currStatusData) => ({
        status: currStatusData._id,
        count: currStatusData.count,
        fill: `var(--color-${currStatusData._id})`,
      }));
      setChartData(currChartData);
      const currIndividualStatusCount = statuses.data.reduce(
        (accumulate, currStatusData) => {
          accumulate[currStatusData._id] = currStatusData.count;
          return accumulate;
        },
        {}
      );
      setIndividualStatusCount(currIndividualStatusCount);
      const currStatusCount = statuses.data.reduce(
        (accumulate, currStatusData) => accumulate + currStatusData.count,
        0
      );
      setStatusCount(currStatusCount);
    }
  }, [statuses]);
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {statusCount}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Statuses
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div>
        <ul>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Unverified</span>
            <span className="rounded-full px-2 bg-[#FFA94D] text-xl text-white">
              {individualStatusCount?.unverified || 0}
            </span>
          </li>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Pending</span>
            <span className="rounded-full px-2 bg-[#FF8C42] text-xl text-white">
              {individualStatusCount?.pending || 0}
            </span>
          </li>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Processing</span>
            <span className="rounded-full px-2 bg-[#E27C20] text-xl text-white">
              {individualStatusCount?.processing || 0}
            </span>
          </li>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Shipped</span>
            <span className="rounded-full px-2 bg-[#CC5C2D] text-xl text-white">
              {individualStatusCount?.shipped || 0}
            </span>
          </li>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Delivered</span>
            <span className="rounded-full px-2 bg-[#B0413E] text-xl text-white">
              {individualStatusCount?.delivered || 0}
            </span>
          </li>
          <li className="my-2 flex justify-between items-center text-sm">
            <span>Cancelled</span>
            <span className="rounded-full px-2 bg-[#804000] text-xl text-white">
              {individualStatusCount?.cancelled || 0}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
