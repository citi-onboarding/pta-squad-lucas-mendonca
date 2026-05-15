/*
  Warnings:

  - You are about to drop the column `avaliableQuantity` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableQuantity` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "avaliableQuantity",
ADD COLUMN     "availableQuantity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
