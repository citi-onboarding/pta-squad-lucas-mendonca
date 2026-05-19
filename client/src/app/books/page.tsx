"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import BookCard from "@/components/BookCard";
import { BookCardProps } from "@/types/bookTypes";


const MOCK_BOOKS: Omit<BookCardProps, "onView" | "onLoan" | "onDelete">[] = [
  { id: "1", title: "Clean Code",              author: "Robert C. Martin",         category: "TECNOLOGIA", availableQuantity: 5 },
  { id: "2", title: "O Pequeno Príncipe",      author: "Antoine de Saint-Exupéry", category: "INFANTIL",   availableQuantity: 8 },
  { id: "3", title: "Dom Casmurro",            author: "Machado de Assis",         category: "ROMANCE",    availableQuantity: 0 },
  { id: "4", title: "Casa-Grande & Senzala",   author: "Gilberto Freyre",         category: "HISTORIA",    availableQuantity: 3 },
  { id: "5", title: "O Deserto dos Tártaros",  author: "Dino Buzzati",             category: "ROMANCE",    availableQuantity: 1 },
  { id: "6", title: "Curso de Física Básica 1",author: "Moysés Nussenzveig",       category: "CIENCIAS",    availableQuantity: 0 },
];


export default function BooksPage() {

  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("ALL");

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = 
      category === "ALL" || book.category === category;

    return matchesSearch && matchesCategory;
  })

  const handleView = (id: string) => console.log("Ver:", id);
  const handleLoan = (id: string) => console.log("Emprestar:", id);
  const handleDelete = (id: string) => console.log("Deletar:", id);


  return (
    <div>
      <Header />
        <main className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-5xl mx-auto px-6 py-8">

            <h1 className="text-2xl font-bold text-gray-900">Livros</h1>
            <p className="text-gray-500">Gerencie o acervo da biblioteca</p>
            
            <SearchInput
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            />

            {filteredBooks.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    {...book}
                    onView={handleView}
                    onLoan={handleLoan}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
              ) : (
                <p className="mt-16 text-center text-gray-400">
                  Nenhum livro encontrado.
                </p>
              )}
            
          </div>
        </main>
    </div>
  );
}