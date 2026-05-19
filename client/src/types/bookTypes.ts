
export type BookCategory = "ROMANCE" | "INFANTIL" | "TECNOLOGIA" | "HISTORIA" | "CIENCIAS";

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category: BookCategory
  availableQuantity: number;
  onView: (id: string) => void;
  onLoan: (id: string) => void;
  onDelete: (id: string) => void;
}


