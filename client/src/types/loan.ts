export interface Loan {
    id: string;
    book: string;
    client: string;
    rentalDate: string;
    returnDate: string;  
    statusBank:'Em andamento' | 'Devolvido';
}