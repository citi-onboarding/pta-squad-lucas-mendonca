import Header from "@/components/Header";
import LibraryDataCard from "@/components/LibraryDataCard";
import { BookOpen, Clock, AlertCircle } from "lucide-react";



export default function TestPage() {
  
  const livrosAtrasados = 12;

  return (
    <div>
      <Header />
        <main className="w-full p-8">

        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Visão geral da biblioteca</p>

        <div className="mt-6 grid w-full grid-cols-3 gap-4">
          
          <LibraryDataCard
            title="Total livros"
            data="1,245"
            icon={<BookOpen size={22}/>}
            variant="default"
          />

          <LibraryDataCard
            title="Empreśtimos Ativos"
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
    </div>
  );
}