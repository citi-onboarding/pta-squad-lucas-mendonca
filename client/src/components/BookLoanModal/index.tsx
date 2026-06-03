import { createLoan } from "@/services/loans";
import { sendLoanConfirmation } from "@/services/mails";
import { LoanFormData, loanSchema } from "@/types/loan";
import { BookLoanModalProps } from "@/types/loanTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function BookLoanModal({
  isOpen,
  onClose,
  bookId,
  bookTitle,
  onRefreshCatalog,
}: BookLoanModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
  });

  if (!isOpen) return null;

  async function onSubmit(data: LoanFormData) {
    try {
      setIsSubmitting(true);
      
      const dueDate = new Date(data.dueDate);
      dueDate.setUTCHours(23, 59, 59, 999);

      await createLoan({
        bookId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        dueDate,
      });

      await sendLoanConfirmation({
        userEmail: data.customerEmail,
        userName: data.customerName,
        bookTitle: bookTitle,
        loanDate: new Date().toISOString(),
        dueDate: new Date(data.dueDate).toISOString(),
      });

      alert("Empréstimo realizado com sucesso!");
      onRefreshCatalog(); // Atualiza a lista de livros atrás do modal
      onClose(); // Fecha o modal
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar empréstimo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-[405px] rounded-md bg-white">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold">Realizar Empréstimo</h2>
          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
          <div className="rounded-md bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Livro selecionado</p>
            <p>{bookTitle}</p>
          </div>

          <div>
            <label>Nome do Cliente</label>
            <input
              {...register("customerName")}
              placeholder="Digite o nome do cliente"
              className="mt-2 h-12 w-full rounded-md border px-4"
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">
                *Este é um campo obrigatório.
              </p>
            )}
          </div>

          <div>
            <label>Email do Cliente</label>
            <input
              {...register("customerEmail")}
              placeholder="Digite o email do cliente"
              className="mt-2 h-12 w-full rounded-md border px-4"
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-500">
                *Este é um campo obrigatório.
              </p>
            )}
          </div>

          <div>
            <label>Data Prevista de Devolução</label>
            <input
              type="date"
              {...register("dueDate", { valueAsDate: true })}
              className="mt-2 h-12 w-full rounded-md border px-4"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500">*Insira data válida.</p>
            )}
          </div>

          <div className="flex gap-4 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-md border border-[#2C4A73] text-[#2C4A73]" //change to enum for colors
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-12 flex-[2] rounded-md text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#2C4A73]"}`}
            >
              {isSubmitting ? "Enviando..." : "Confirmar Empréstimo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
