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

const ROMANCE_BOOKS = 245;
const INFANTIL_BOOKS = 231;
const TECNOLOGIA_BOOKS = 320;
const CIENCIAS_BOOKS = 270;
const HISTORIA_BOOKS = 189;

const mockData = [
  { category: "Romance", quantity: ROMANCE_BOOKS },
  { category: "Infantil", quantity: INFANTIL_BOOKS },
  { category: "Tecnologia", quantity: TECNOLOGIA_BOOKS },
  { category: "Ciências", quantity: CIENCIAS_BOOKS },
  { category: "História", quantity: HISTORIA_BOOKS },
];

const chartConfig = {
  quantity: {
    label: "Livros",
    color: "#00C389",
  },
} satisfies ChartConfig;

export function BooksChart() {
  return (
    <Card className="w-full rounded-lg border border-slate-200 bg-white shadow-md px-6">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-sm font-medium text-slate-900">
          Livros por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={mockData}>
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