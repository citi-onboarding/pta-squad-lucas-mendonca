"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";

interface BooksChartProps {
  data: { category: string; quantity: number }[];
}

const chartConfig = {
  quantity: {
    label: "Livros",
    color: "#00C389",
  },
} satisfies ChartConfig;

export function BooksChart({ data }: BooksChartProps) {
  return (
    <Card className="w-full rounded-lg border border-slate-200 bg-white shadow-md px-6">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-sm font-medium text-slate-900">
          Livros por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical = {false} strokeDasharray="8 8" stroke="#dbdee2"/>
                <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                />
                <YAxis
                    ticks={[0,80, 160, 240, 320]}
                    axisLine={true}
                    tickLine={false}
                />
                
            <Bar
              dataKey="quantity"
              fill="var(--color-quantity)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}