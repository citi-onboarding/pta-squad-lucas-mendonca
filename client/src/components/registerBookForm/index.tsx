"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { bookSchema, BookFormData } from "@/types/book";

//Validation schema using Zod to enforce form rules and required fields

export default function RegisterBookForm(){

    const router = useRouter();

    // Initialize React Hook Form integrated with Zod validation
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BookFormData>({
      resolver: zodResolver(bookSchema),
      defaultValues:{
        category:""
      }
    });

 //Watch the category field to dynamically update custom button styles when selected
  const selectedCategory = watch("category");

  // Handles form submission and converts string inputs to absolute numbers before processing
  const onSubmit = (data: BookFormData) => {
    const finalData = {
      ...data,
      year: Number(data.year),
      quantity: Number(data.quantity)
    };
  };


  const categories = ["Romance", "Tecnologia", "História", "Ciências", "Infantil"];

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
            <input {...register("title")} className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition" />
            {errors.title && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Autor</label>
            <input {...register("author")} className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition" />
            {errors.author && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">ISBN</label>
            <input {...register("isbn")} className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition" />
            {errors.isbn && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Editora</label>
            <input {...register("publisher")} className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition" />
            {errors.publisher && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Ano</label>
            <input
                type="number"
                {...register("year")}
                className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                {errors.year && (<p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>)}
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Quantidade</label>
            <input type="number" {...register("quantity")} className="border p-2.5 bg-gray-50 rounded-lg outline-none focus:border-emerald-500 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">*Este é um campo obrigatório.</p>}
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-700 text-sm">Categoria</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setValue("category", cat, { shouldValidate: true })}
                  className={`border rounded-xl p-20 flex items-center justify-center text-sm font-medium transition ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold shadow-sm"
                      : errors.category
                        ? "border-red-500 bg-white text-gray-600"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
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
            className="border border-emerald-500 text-emerald-500 px-5 py-2.5 rounded-lg bg-white hover:bg-emerald-50 font-medium transition text-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium transition text-sm shadow-sm"
          >
            Salvar Livro
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}





