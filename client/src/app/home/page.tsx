"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import LibraryDataCard from "@/components/LibraryDataCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import { BooksChart } from "@/components/BooksChart";
import { LoanStatusCard } from "@/components/LoanStatusCard";
import { fetchDashboardData, type DashboardData } from "@/lib/dashboard";

export default function DashboardPage() {
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData()
    .then(setData)
    .catch((err) => {
      console.error(err);
      setError(err.message);
    })
    .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <p>Carregando...</p>;
  if (error)   return <p>Erro: {error}</p>;
  if (!data)   return null;

  const booksByCategory = data.books.reduce<{ category: string; quantity: number }[]>(
  (acc, book) => {
    const existing = acc.find(item => item.category === book.category);
    if (existing) {
      existing.quantity += book.totalQuantity;
    } else {
      acc.push({ category: book.category, quantity: book.totalQuantity });
    }
    return acc;
  },
  []
);

  const totalBooks = data.books.reduce((acc, book) => acc + book.totalQuantity, 0);
  const totalLoans = data.loans.filter(loan => loan.status === "EM_ANDAMENTO").length;
  const lateLoans  = data.loans.filter(loan => {
      const isPastDue = new Date() > new Date(loan.dueDate);
      return loan.status !== "DEVOLVIDO" && isPastDue;
  }).length;
  
  return (
    <div>
      <Header />
        <main className="w-full p-8">

        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Visão geral da biblioteca</p>

        <div className="mt-6 grid w-full grid-cols-3 gap-4">
          
          <LibraryDataCard
            title="Total de Livros"
            data={totalBooks}
            icon={<BookOpen size={22}/>}
            variant="default"
          />

          <LibraryDataCard
            title="Empréstimos Ativos"
            data={totalLoans}
            icon={<Clock size={22}/>}
            variant="default"
          />
            
          <LibraryDataCard
            title="Livros Atrasados"
            data={lateLoans}
            icon={<AlertCircle size={22}/>}
            variant={lateLoans > 0 ? "alert" : "default"}          
          />

        </div>
      </main>

      <div className="w-full px-6">
        <BooksChart data={booksByCategory}/>
      </div>

      <LoanStatusCard loans={data.loans} />
      
    </div>
  );
}