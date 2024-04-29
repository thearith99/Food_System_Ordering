-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
