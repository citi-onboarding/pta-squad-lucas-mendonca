import Header from "@/components/Header";

export default function BooksPage() {
  return (
    <div>
      <Header />
        <main className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">Livros</h1>
          <p className="text-gray-500">Lista de livros da biblioteca</p>
        </main>
    </div>
  );
}