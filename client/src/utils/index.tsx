import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BookCategory } from "@/types/bookTypes";
import cienciasCover from "@/assets/ciencias.png";
import historiaCover from "@/assets/historia.png";
import infantilCover from "@/assets/infantil.png";
import romanceCover from "@/assets/romance.png";
import tecnologiaCover from "@/assets/tecnologia.png";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const coverByCategory: Record<BookCategory, { src: string }> = {
    ROMANCE: romanceCover,
    INFANTIL: infantilCover,
    TECNOLOGIA: tecnologiaCover,
    HISTORIA: historiaCover,
    CIENCIAS: cienciasCover,
};