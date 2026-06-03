"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { bookSchema, BookFormData } from "@/types/book";
import Image from "next/image";
import { useState } from "react";
import { createBook } from "@/services/books";


  const categories = [
  { name: "Romance", image: require("@/assets/romance.png") },
  { name: "Tecnologia", image: require("@/assets/tecnologia.png") },
  { name: "História", image: require("@/assets/historia.png") },
  { name: "Ciências", image: require("@/assets/ciencias.png") },
  { name: "Infantil", image: require("@/assets/infantil.png") },
    ];

export default function RegisterBookForm(){

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BookFormData>({
      resolver: zodResolver(bookSchema),
      defaultValues:{
        category:""
      }
    });

 //Watch the category field to dynamically update custom button styles when selected
  const selectedCategory = watch("category");

  // Maps front-end category names to the expected back-end enum values (without special characters)
 const categoryMap: Record<string, string> = {
  Romance: "ROMANCE",
  Tecnologia: "TECNOLOGIA",
  História: "HISTORIA",
  Ciências: "CIENCIAS",
  Infantil: "INFANTIL",
};

const onSubmit = (data: BookFormData) => {
  const payload = {
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    publisher: data.publisher,
    year: Number(data.year),
    totalQuantity: Number(data.quantity), // Renamed from quantity to match CreateBookDTO
    category: categoryMap[data.category] ?? data.category.toUpperCase(),
  };

  handleRegisterBook(payload);
};

  const handleRegisterBook = async (payload: any) => {
  try {
    setIsSubmitting(true);
    await createBook(payload);
    alert("Livro cadastrado com sucesso!");
    router.push("/books");
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    alert("Ocorreu um erro ao cadastrar o livro. Tente novamente.");
  } finally {
    setIsSubmitting(false); // Always resets the loading state regardless of success or failure
  }
};


  // Book registration card layout 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">

      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cadastrar Novo Livro</h2>
          <p className="text-sm text-gray-500">Insira as informações do acervo abaixo.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-xl p-8 w-full flex flex-col gap-6"
        >


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Título</label>
            <input {...register("title")} placeholder="Digite o título do livro..." className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition" />
            {errors.title && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Autor</label>
            <input {...register("author")} placeholder="Digite o autor do livro..." className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition" />
            {errors.author && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">ISBN</label>
            <input {...register("isbn")} placeholder="Digite o ISBN do livro..." className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition" />
            {errors.isbn && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Editora</label>
            <input {...register("publisher")} placeholder="Digite a editora do livro..." className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition" />
            {errors.publisher && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ano</label>
            <input
                type="number"
                placeholder="Digite o ano de lançamento do livro..."
                {...register("year")}
                className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                {errors.year && (<p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>)}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Quantidade</label>
            <input type="number" {...register("quantity")} placeholder="Digite a quantidade de livros..." className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-primary-blue transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-700 text-sm">Categoria</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setValue("category", cat.name, { shouldValidate: true })}
                  className={`border rounded-xl p-0 overflow-hidden flex items-center justify-center transition aspect-square ${
                    isSelected
                      ? "border-primary-blue bg-secondary-blue text-white font-semibold shadow-sm"
                      : errors.category
                        ? "border-red-500 bg-white text-gray-600"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                    <div className="w-full h-full relative flex items-center justify-center">
                        <Image
                            src={cat.image.default || cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"/>
                    </div>

                </button>
              );
            })}
          </div>
          {errors.category && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
        </div>

        <div className="border-t pt-4 mt-2 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/books")}
            className="border border-primary-blue text-primary-blue px-5 py-2.5 rounded-lg bg-white hover:bg-secondary-blue hover:text-white font-medium text-sm shadow-sm transition-transform delay-100 duration-300 ease-in-out transform-gpu hover:-translate-y-1 hover:scale-105"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-blue hover:bg-tertiary-blue text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm transition-transform delay-100 duration-300 ease-in-out transform-gpu hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Salvar Livro"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}