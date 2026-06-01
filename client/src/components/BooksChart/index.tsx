"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getLoanMetricsByCategory } from "@/services/loans"; 

interface BooksChartProps {
  data: { category: string; quantity: number }[];
}

const chartConfig = {
  quantity: {
    label: "Quantidade",
    color: "var(--secondary-blue)",
  },
} satisfies ChartConfig;

export function BooksChart({ data: booksData }: BooksChartProps) {
  const [chartType, setChartType] = useState<"books" | "loans">("books");
  const [selectedSemester, setSelectedSemester] = useState("Desde sempre");
  
  const [loanData, setLoanData] = useState<{ category: string; quantity: number }[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(false);

  useEffect(() => {
    if (chartType === "loans") {
      setIsLoadingLoans(true);
      
      const periodParam = selectedSemester === "Desde sempre" ? "" : selectedSemester;

      getLoanMetricsByCategory(periodParam)
        .then((response) => {
          const formattedData = response.data.map((item: { category: string; count: number }) => ({
            category: item.category,
            quantity: item.count,
          }));
          setLoanData(formattedData);
        })
        .catch((error) => {
          console.error("Erro ao buscar métricas de empréstimos:", error);
        })
        .finally(() => {
          setIsLoadingLoans(false);
        });
    }
  }, [chartType, selectedSemester]);

  const displayData = chartType === "books" ? booksData : loanData;

  return (
    <Card className="w-full rounded-lg border border-slate-200 bg-white shadow-md px-6">
      <CardHeader className="px-5 pt-5 pb-2">
        <div className="flex justify-between items-center w-full mb-4 py-4 gap-4">
          
          <div className="relative inline-flex items-center">
            <select
              value={chartType}
              onChange={(e) =>
                setChartType(e.target.value as "books" | "loans")
              }
              className="appearance-none w-full bg-white border border-slate-300 rounded-lg py-2 pl-4 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none cursor-pointer transition-all hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="books">Livros por Categoria</option>
              <option value="loans">Empréstimos por Categoria</option>
            </select>
            
            <svg
              className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {chartType === "loans" && (
            <div className="relative inline-flex items-center">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="appearance-none w-full bg-white border border-slate-300 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none cursor-pointer transition-all hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Desde sempre">Desde sempre</option>
                <option value="2026.1">2026.1</option>
                <option value="2025.2">2025.2</option>
                <option value="2025.1">2025.1</option>
                <option value="2024.2">2024.2</option>
                <option value="2024.1">2024.1</option>
                <option value="2023.2">2023.2</option>
                <option value="2023.1">2023.1</option>
                <option value="2022.2">2022.2</option>
                <option value="2022.1">2022.1</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        {isLoadingLoans ? (
          <div className="h-[350px] w-full flex items-center justify-center text-slate-500">
            Carregando dados de empréstimos...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart accessibilityLayer data={displayData}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="8 8"
                stroke="#dbdee2"
              />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={true}
              />
              <YAxis
                axisLine={true}
                tickLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="quantity"
                fill="var(--color-secondary-blue)"
                radius={6}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}