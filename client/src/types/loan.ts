export interface Loan {
    id: string;
    book: string;
    customerName: string;
    customerEmail: string;
    returnDate: Date;  
    status:'Em andamento' | 'Devolvido';
}