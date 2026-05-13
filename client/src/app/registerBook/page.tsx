import Header from "@/components/Header";

export default function RegisterBookPage() {
  return (
    <div>
      <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">Novo Livro</h1>
          <p className="text-gray-500">Cadastro de novo livro</p>
        </main>
    </div>
    
  );
}