import Header from "@/components/Header";
import LibraryDataCard from "@/components/LibraryDataCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import { BooksChart } from "@/components/BooksChart";
import { LoanStatusCard } from "@/components/LoanStatusCard";
import { testLoans } from "@/testeStatus";     


export default function DashboardPage() {
  
  const livrosAtrasados = 12;

  return (
    <div>
      <Header />
        <main className="w-full p-8">

        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Visão geral da biblioteca</p>

        <div className="mt-6 grid w-full grid-cols-3 gap-4">
          
          <LibraryDataCard
            title="Total de Livros"
            data="1,245"
            icon={<BookOpen size={22}/>}
            variant="default"
          />

          <LibraryDataCard
            title="Empréstimos Ativos"
            data="87"
            icon={<Clock size={22}/>}
            variant="default"
          />
            
          <LibraryDataCard
            title="Livros Atrasados"
            data={livrosAtrasados}
            icon={<AlertCircle size={22}/>}
            variant={livrosAtrasados > 0 ? "alert" : "default"}          
          />

        </div>
      </main>

      <div className="w-full px-6">
        <BooksChart/>
      </div>

      <LoanStatusCard loans={testLoans} />
      
    </div>
  );
}