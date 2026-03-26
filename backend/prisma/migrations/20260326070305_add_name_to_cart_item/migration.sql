/*
  Warnings:

  - Added the required column `name` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_smartphone_id_fkey";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_smartphone_id_fkey" FOREIGN KEY ("smartphone_id") REFERENCES "smartphones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
