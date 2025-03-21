/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-day-picker";

import { useGetPaymentStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

export const description = "An interactive bar chart";

const chartConfig = {
  amount: {
    label: "amount",
    color: "#3bb77e",
  },
} satisfies ChartConfig;

function PaymentStatistics() {
  // Retrieve year from URL search params manually
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const yearParam = params.get("year");
    if (yearParam) {
      setYear(Number(yearParam));
    }
  }, []);

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const { data, isLoading } = useGetPaymentStatisticsQuery(selectedDateRange);

  const monthlyTotals = data?.data?.reduce(
    (
      acc: { [x: string]: any },
      transaction: { createdAt: string; amount: any }
    ) => {
      const date = parseISO(transaction.createdAt);
      const month = format(date, "MMMM");

      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += transaction.amount;
      return acc;
    },
    {}
  );

  const result = Object.entries(monthlyTotals || {}).map(([month, total]) => ({
    month,
    amount: total as number,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDateChange = (date: DateRange | undefined) => {
    setSelectedDateRange(date);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between space-y-0 border-b sm:flex-row px-6 py-5 sm:py-6 flex-wrap gap-[15px]">
        <div className="flex flex-col justify-center gap-1">
          <CardTitle>Payment - Statistics</CardTitle>
          <CardDescription>
            Showing total payment of year {year}
          </CardDescription>
        </div>
        <div className="relative w-auto">
          <DateRangePicker onChange={handleDateChange} />
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={result}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="amount" fill="#3bb77e" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PaymentStatistics;
