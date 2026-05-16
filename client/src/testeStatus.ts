export interface Loan {
  id: string;
  book: string;
  client: string;
  rentalDate: string;
  returnDate: string;
  statusBank: "Em andamento" | "Devolvido";
}

// Status Calculation Logic
export function calcularStatus(loan: Loan): "Em andamento" | "Devolvido" | "Atrasado" {
  if (loan.statusBank === "Devolvido") return "Devolvido";

  const today = new Date();
  const dateReurn = new Date(loan.rentalDate);

  if (today > dateReurn) return "Atrasado";
  return "Em andamento";
}

export const testLoans: Loan[] = [
  {
    id: "1",
    book: "Entendendo algoritmos",
    client: "João",
    rentalDate: "2026-05-01",
    returnDate: "2026-05-10",
    statusBank: "Em andamento",
  },
  {
    id: "2",
    book: "Código limpo",
    client: "Gabi",
    rentalDate: "2026-05-14",
    returnDate: "2026-05-25",
    statusBank: "Em andamento",
  },
  {
    id: "3",
    book: "Engenharia de Software em Dimensões",
    client: "Miguel",
    rentalDate: "2026-05-01",
    returnDate: "2026-05-05",
    statusBank: "Devolvido",
  },
  {
    id: "4",
    book: "Pequeno Príncipe",
    client: "Roger",
    rentalDate: "2026-05-02",
    returnDate: "2026-05-12",
    statusBank: "Devolvido",

  },
];