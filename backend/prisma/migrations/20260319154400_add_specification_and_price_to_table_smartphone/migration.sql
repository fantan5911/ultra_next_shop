/*
  Warnings:

  - Added the required column `price` to the `smartphones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specifications` to the `smartphones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "smartphones" DROP CONSTRAINT "smartphones_cartId_fkey";

-- DropIndex
DROP INDEX "smartphones_cartId_key";

-- AlterTable
ALTER TABLE "smartphones" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "specifications" TEXT NOT NULL,
ALTER COLUMN "cartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "smartphones" ADD CONSTRAINT "smartphones_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
