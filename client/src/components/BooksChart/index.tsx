"use client"

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface BooksChartProps {
  data: { category: string; quantity: number }[];
}

const chartConfig = {
  quantity: {
    label: "Livros",
    color: "var(--secondary-blue)",
  },
} satisfies ChartConfig;

export function BooksChart({ data }: BooksChartProps) {
  // 'books' for Books by Category | 'loans' for Loans by Category
  const [chartType, setChartType] = useState<'books' | 'loans'>('books');

  // Semester filter control (default shows full history)
  const [selectedSemester, setSelectedSemester] = useState('Desde sempre');

  return (
    <Card className="w-full rounded-lg border border-slate-200 bg-white shadow-md px-6">
      <CardHeader className="px-5 pt-5 pb-2">

        <div className="flex justify-between items-center w-full mb-4">

          {/* Main selector — replaces the static title */}
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as 'books' | 'loans')}
            className="text-sm font-semibold text-slate-900 bg-transparent outline-none cursor-pointer"
          >
            <option value="books">Livros por Categoria</option>
            <option value="loans">Empréstimos por Categoria</option>
          </select>

          {/* Semester selector — only visible when "Empréstimos por Categoria" is active */}
          {chartType === 'loans' && (
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm bg-white outline-none focus:border-emerald-500"
            >
              <option value="Desde sempre">Desde sempre</option>
              <option value="2022.1">2022.1</option>
              <option value="2022.2">2022.2</option>
              <option value="2023.1">2023.1</option>
              <option value="2023.2">2023.2</option>
              <option value="2024.1">2024.1</option>
              <option value="2024.2">2024.2</option>
              <option value="2025.1">2025.1</option>
              <option value="2025.2">2025.2</option>
              <option value="2026.1">2026.1</option>
            </select>
          )}

        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="8 8" stroke="#dbdee2"/>
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />
            <YAxis
              ticks={[0, 80, 160, 240, 320]}
              axisLine={true}
              tickLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent/>}/>
            <Bar
              dataKey="quantity"
              fill="var(--color-secondary-blue)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}