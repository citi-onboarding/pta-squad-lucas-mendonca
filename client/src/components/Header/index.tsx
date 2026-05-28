"use client";
 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, PlusCircle } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
 
  const navLinks = [
    {
      label: "Dashboard",
      href: "/home",
      icon: <House size={16} />,
      variant: "default",
    },
    {
      label: "Livros",
      href: "/books",
      icon: <BookOpen size={16} />,
      variant: "default",
    },
    {
        label: "Novo Livro",
        href: "/registerBook",
        icon: <PlusCircle size={16}/>,
        variant: "primary",
    }
]

return (
    <header className="w-full border-b border-gray-200 bg-white py-3">

        <div className="flex w-full items-center justify-between px-8">

            <div className="flex items-center gap-3">
                <Image
                  src="/img/logoCiti_semfundo-azul.png"
                  alt="Logo Citi"
                  width={82.5}
                  height={35.99}
                />
                <span className="text-xl font-semibold text-gray-800">
                    Biblioteca Escolar
                </span>
            </div>

                                  
            <nav className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                const className = 
                    link.variant === "primary"
                        ? "flex items-center gap-2 rounded-md bg-primary-blue px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-tertiary-blue"
                        : `flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-secondary-blue text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`; 

                return (
                  
                  <Link
                    key={link.href}
                    href={link.href}
                    className={className}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}          
            </nav> 

        </div>

    </header>


);

}