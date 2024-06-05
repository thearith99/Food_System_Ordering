/*
  Warnings:

  - You are about to drop the column `orderId` on the `OrderDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "orderId";
