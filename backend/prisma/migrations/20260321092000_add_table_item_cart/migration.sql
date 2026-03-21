/*
  Warnings:

  - You are about to drop the column `userId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `smartphones` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `smartphones` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `smartphones` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `smartphones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brand_id]` on the table `smartphones` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `smartphones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `smartphones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `smartphones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "smartphones" DROP CONSTRAINT "smartphones_brandId_fkey";

-- DropForeignKey
ALTER TABLE "smartphones" DROP CONSTRAINT "smartphones_cartId_fkey";

-- DropForeignKey
ALTER TABLE "smartphones" DROP CONSTRAINT "smartphones_userId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- DropIndex
DROP INDEX "carts_userId_key";

-- DropIndex
DROP INDEX "smartphones_brandId_key";

-- DropIndex
DROP INDEX "smartphones_userId_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "smartphones" DROP COLUMN "brandId",
DROP COLUMN "cartId",
DROP COLUMN "userId",
ADD COLUMN     "brand_id" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cart_item" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "cart_id" TEXT NOT NULL,
    "smartphone_id" TEXT NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_cart_id_smartphone_id_key" ON "cart_item"("cart_id", "smartphone_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "smartphones_user_id_key" ON "smartphones"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "smartphones_brand_id_key" ON "smartphones"("brand_id");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_smartphone_id_fkey" FOREIGN KEY ("smartphone_id") REFERENCES "smartphones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smartphones" ADD CONSTRAINT "smartphones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "smartphones" ADD CONSTRAINT "smartphones_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
