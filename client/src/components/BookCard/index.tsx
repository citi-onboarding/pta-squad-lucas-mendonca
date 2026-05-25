import { Eye, BookMarked, Trash2 } from 'lucide-react';

import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { coverByCategory } from '@/utils';
import { BookCardProps, BookCategory } from "@/types/bookTypes";


const categoryMeta: Record<BookCategory, { label: string; color: string }> = {
  ROMANCE:    { label: "Romance",    color: "text-green-600" },
  INFANTIL:   { label: "Infantil",   color: "text-teal-500"  },
  TECNOLOGIA: { label: "Tecnologia", color: "text-emerald-600" },
  HISTORIA:   { label: "História",   color: "text-green-700" },
  CIENCIAS:   { label: "Ciências",   color: "text-teal-600"  },
};

export default function BookCard({
    id,
    title,
    author,
    category,
    availableQuantity,
    onView,
    onLoan,
    onDelete,
}: BookCardProps) {
    const isOutOfStock = availableQuantity === 0;
    const { label, color} = categoryMeta[category];

    return(
        <Card className="flex flex-col overflow-hidden p-0">
            
            <div className="h-44 w-full bg-gray-100"> 
                <img
                src={coverByCategory[category].src} 
                alt={title}
                className="h-full w-full object-cover"
                />    
            </div>

            <CardContent className="flex flex-col gap-1 px-4 pt-4 pb-2">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                    {title}
                </h3>

                <p className="text-xs text-gray-500">{author}</p>

                <Badge
                variant="outline"
                className={`w-fit border-none px-0 text-xs font-medium ${color}`}
                >
                    {label}
                </Badge>  

                <p className="text-xs text-gray-600">
                    Disponível: {availableQuantity} unidade(s)
                </p>
            </CardContent>

            <CardFooter className="flex gap-2 px-4 pb-4 pt-0">
                
                <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-xs border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                onClick={() => onView(id)}
                >
                    <Eye size={14} />
                    Ver

                </Button>

                <Button
                size="sm"
                disabled={isOutOfStock}
                onClick={() => onLoan(id)}
                className={`flex-1 gap-1 text-xs ${
                    isOutOfStock
                        ? "bg-gray-200 text-gray-400 hover:bg-gray-200"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
                >
                    <BookMarked size={14} />
                    Emprestar
                </Button>

                <Button
                variant="destructive"
                size="sm"
                className="px-3"
                onClick={() => onDelete(id)}
                >
                    <Trash2 size={14} />
                </Button>

            </CardFooter>
        </Card>
    );
}