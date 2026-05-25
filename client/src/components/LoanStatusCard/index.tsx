import React from 'react';
import { Loan } from '@/types/loanTypes';


// Status Calculation Logic
function calculateStatus(loan: Loan): 'Em andamento' | 'Devolvido' | 'Atrasado'{
    if (loan.status === 'DEVOLVIDO') 
        return 'Devolvido';

    const hoje = new Date();
    const dataDevolucao = new Date(loan.dueDate);

    if (hoje > dataDevolucao) return 'Atrasado';
    return 'Em andamento';
}

export function LoanStatusCard({ loans }: { loans: Loan[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <h2 className="text-lg font-bold mb-4">Últimos Empréstimos</h2>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Livro</th>
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Data de Locação</th>
            <th className="p-2 text-left">Data de Devolução</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const status = calculateStatus(loan);
            const badgeColor =
              status === "Atrasado"
                ? "bg-red-100 text-red-600"
                : status === "Devolvido"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-700";

            return (
              <tr key={loan.id} className="border-b">
                <td className="p-2">{loan.book.title}</td>
                <td className="p-2">{loan.customerName}</td>
                <td className="p-2">
                  {new Date(loan.loanDate).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-2">
                  {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}