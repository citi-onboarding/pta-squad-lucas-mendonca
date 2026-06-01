"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import BookCard from "@/components/BookCard";
import { BookCardProps } from "@/types/bookTypes";
import { BookDetailsModal } from "@/components/BookDetailsModal";
import { BookLoanModal } from "@/components/BookLoanModal";
import { findManyBooks, deleteBook } from "@/services/books"; 

function normalize(text: string): string {
  if (!text) return "";
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");    
}

export default function BooksPage() {

  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState({ id: "", title: ""})

  const loadCatalog = async () => {
    try {
      const response = await findManyBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao carregar o catálogo de livros:", error);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const filteredBooks = books.filter((book) => {
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
    loadCatalog();
  };  
  const handleLoan = (id: string, title: string) => {
    setSelectedBook({id: id, title: title})
    setIsLoanModalOpen(true)
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este livro?")
    if (!confirmDelete) return;

    try{

      await deleteBook(id);
      handleRefreshCatalog();
    }catch(error:any){
      console.error("Erro ao deletar o livro: ", error);
      if(error.response?.status ===400){
        alert("O livro não pode ser apagado pois tem um empréstimo em andamento ou atrasado.")
      }
      else{
        alert("Ocorreu um erro inesperado ao tentar deletar o livro")
      }
    }
  };


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
                    onLoan={() => handleLoan(book.id, book.title)}
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
        <BookLoanModal
          isOpen={isLoanModalOpen}
          onClose={() => setIsLoanModalOpen(false)}
          bookId={selectedBook.id}
          bookTitle={selectedBook.title}
          onRefreshCatalog={handleRefreshCatalog}
        />
    </div>
  );
}