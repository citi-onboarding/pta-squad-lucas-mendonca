"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import BookCard from "@/components/BookCard";
import { BookCardProps } from "@/types/bookTypes";
import { BookDetailsModal } from "@/components/BookDetailsModal";

const MOCK_BOOKS: Omit<BookCardProps, "onView" | "onLoan" | "onDelete">[] = [
  { 
    id: "967c6435-f8fe-470e-a07a-ffcbbc892f1c", 
    title: "Harry Potter", 
    author: "J.R.R. Tolkien", 
    category: "ROMANCE", 
    availableQuantity: 5 
  },
  { 
    id: "8ed46451-8bc2-42d7-b785-cf0d8bc3aa4e", 
    title: "Harry Potter", 
    author: "J.R.R. Tolkien", 
    category: "TECNOLOGIA", 
    availableQuantity: 5 
  },
  { 
    id: "39bdf87d-4e25-45bc-9e25-d1a5fc466861", 
    title: "Introdução à Lógica Proposicional e Estrutural", 
    author: "Alan Turing", 
    category: "CIENCIAS", 
    availableQuantity: 5 
  },
  { 
    id: "e5f35a9b-a22e-4ba6-aaa1-d9583c179ad5", 
    title: "Arquitetura e Construção: Guia The Sims", 
    author: "Laura Caixão", 
    category: "TECNOLOGIA", 
    availableQuantity: 10 
  },
  { 
    id: "c50c4145-ba55-40d5-b0fd-4f44c737d5af", 
    title: "Diário de Sobrevivência no Velho Oeste", 
    author: "Arthur Morgan", 
    category: "HISTORIA", 
    availableQuantity: 3 
  }
];

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");    
}

export default function BooksPage() {

  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      normalize(book.title).includes(normalize(search)) || normalize(book.author).includes(normalize(search));

    const matchesCategory = 
      category === "ALL" || book.category === category;

    return matchesSearch && matchesCategory;
  })
  const handleView = (id: string) => {
    setSelectedBookId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const handleRefreshCatalog = () => {
    console.log("Atualizando lista de livros após alteração no modal...");
  };  
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
           <BookDetailsModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              bookId={selectedBookId}
              onRefreshCatalog={handleRefreshCatalog}
            /> 
          </div>
        </main>
    </div>
  );
}