import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { findBookById } from '@/services/books';
import { findBookLoans, finishLoan } from '@/services/loans'; 
import { Book, BookDetailsModalProps, Loan } from '@/types/modalBookDetails';
import { coverByCategory } from '@/utils/index';

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  isOpen,
  onClose,
  bookId,
  onRefreshCatalog,
}) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchBookData = async () => {
    if (!bookId) return;

    try {
      setLoading(true);
      setBook(null);
      

      const [bookResponse, loansResponse] = await Promise.all([
        findBookById(bookId),
        findBookLoans(bookId)
      ]);

      const bookData = bookResponse.data;
      const loansData = loansResponse.data;

      setBook({
        ...bookData,
        loans: loansData,
      });

    } catch (error) {
      console.error("Erro ao buscar os dados da API:", error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && bookId) {
      fetchBookData();
    }
  }, [isOpen, bookId]);

  const handleFinishLoan = async (loanId: string) => {
    try {
      await finishLoan({ loanId }); 
      
      console.log(`Empréstimo ${loanId} encerrado com sucesso na API.`);
      
      await fetchBookData(); 
      
      onRefreshCatalog();

    } catch (error) {
      console.error("Erro ao encerrar empréstimo na API:", error);
    }
  };

  const handleSendReminder = (customerEmail: string) => {

    alert(`Lembrete enviado com sucesso para ${customerEmail}`);
  };

  const getDynamicStatus = (loan: Loan) => {
    let currentStatus = loan.status;
    const isPastDue = new Date() > new Date(loan.dueDate);

    if (currentStatus !== 'DEVOLVIDO' && isPastDue) {
      return 'ATRASADO';
    }
    return currentStatus;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const badgeStyles = {
    EM_ANDAMENTO: 'bg-yellow-100 text-yellow-700',
    ATRASADO: 'bg-red-100 text-red-700',
    DEVOLVIDO: 'bg-green-100 text-green-700',
  };

  const badgeLabels = {
    EM_ANDAMENTO: 'Em andamento',
    ATRASADO: 'Atrasado',
    DEVOLVIDO: 'Devolvido',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-6 bg-white">
        
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Detalhes do Livro
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">Carregando informações do banco de dados...</div>
        ) : book ? (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-32 h-48 bg-gray-100 rounded border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                    src={coverByCategory[book.category]?.src} 
                    alt={`Capa do livro ${book.title}`}
                    className="h-full w-full object-cover" 
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="block text-gray-500">ISBN</span>
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Categoria</span>
                    <span className="font-medium text-[#2C4A73]">{book.category}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Editora</span>
                    <span className="font-medium">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Ano</span>
                    <span className="font-medium">{book.year}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Quantidade Total</span>
                    <span className="font-medium">{book.totalQuantity} unidades</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Quantidade Disponível</span>
                    <span className="font-medium text-[#2C4A73]">{book.availableQuantity} unidades</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Empréstimos</h4>
              <div className="flex flex-col gap-4">
                {book.loans && book.loans.length > 0 ? (
                  book.loans.map((loan) => {
                    const currentStatus = getDynamicStatus(loan);

                    return (
                      <div key={loan.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow">
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium text-gray-800">{loan.customerName}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStyles[currentStatus]}`}>
                              {badgeLabels[currentStatus]}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{loan.customerEmail}</p>
                          <p className="text-xs text-gray-500">
                            Locação: {formatDate(loan.loanDate)} &nbsp;&nbsp;|&nbsp;&nbsp; Previsão: {formatDate(loan.dueDate)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {currentStatus === 'ATRASADO' && (
                            <button 
                              onClick={() => handleSendReminder(loan.customerEmail)}
                              className="px-4 py-1.5 text-sm font-medium text-[#2C4A73] border border-[#2C4A73] rounded hover:bg-[#2C4A73]/10 transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              Enviar Lembrete
                            </button>
                          )}

                          {(currentStatus === 'EM_ANDAMENTO' || currentStatus === 'ATRASADO') && (
                            <button 
                              onClick={() => handleFinishLoan(loan.id)}
                              className="px-4 py-1.5 text-sm font-medium text-white bg-[#2C4A73] rounded hover:bg-[#1f3554] transition-colors"
                            >
                              Encerrar
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">Nenhum histórico encontrado para este livro.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-red-500">Erro ao carregar dados do livro.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};