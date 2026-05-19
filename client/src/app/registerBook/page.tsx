import Header from "@/components/Header";

export default function RegisterBookPage() {
  return (
    <div>
      <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">Cadastrar Novo Livro</h1>
          <p className="text-gray-500">Adicione um novo livro ao acervo</p>
        </main>
    </div>
    
  );
}