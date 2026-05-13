/*
  Warnings:

  - You are about to drop the `Emprestimo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ROMANCE', 'INFANTIL', 'TECNOLOGIA', 'HISTORIA', 'CIENCIAS');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('EM_ANDAMENTO', 'DEVOLVIDO', 'ATRASADO');

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_livroId_fkey";

-- DropTable
DROP TABLE "Emprestimo";

-- DropTable
DROP TABLE "Livro";

-- DropEnum
DROP TYPE "Categoria";

-- DropEnum
DROP TYPE "StatusEmprestimo";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "avaliableQuantity" INTEGER NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'EM_ANDAMENTO',

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
