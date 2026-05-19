"use client";

import { Search } from "lucide-react";
import { BookCategory } from "@/types/bookTypes";

type Category = BookCategory | "ALL"

interface SerchInputProps {
    onSearchChange:   (value: string) => void;
    onCategoryChange: (value: string) => void;
}

interface CategoryOption {
    label: string;
    value: string;
}

const CATEGORIES: CategoryOption[] = [
    {label: "Todas as categorias", value: "ALL"},
    {label: "Romance",             value: "ROMANCE"},
    {label: "Infantil",            value: "INFANTIL"},
    {label: "Tecnologia",          value: "TECNOLOGIA"},
    {label: "História",            value: "HISTORIA"},
    {label: "Ciência",             value: "CIENCIAS"},
];

export default function SearchInput({onSearchChange, onCategoryChange}: SerchInputProps){
    return(
        <div className="flex flex-col gap-3 md:flex-row md:items-center bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3">
            
            <div className="relative flex-1">
                
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                    aria-hidden="true"
                />

                <input
                    type="text"
                    placeholder="Buscar por título ou autor..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="
                        w-full
                        pl-9 pr-4 py-2
                        text-sm text-gray-700
                        placeholder:text-gray-400
                        bg-transparent
                        border border-gray-200 rounded-md
                        outline-none
                        focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30
                        transition-colors duration-150
                    "
                />
            </div>

            <select
                defaultValue="ALL"
                onChange={(e) => onCategoryChange(e.target.value as Category)}
                className="
                    md:w-52
                    px-3 py-2
                    text-sm text-gray-600
                    bg-white
                    border border-gray-200 rounded-md
                    outline-none
                    focus:ring-1 focus:ring-emerald-500/30
                    cursor-pointer
                    transition-colors duration-150
                "            
            >
                {CATEGORIES.map(({label, value}) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>  
        </div>
    );
}