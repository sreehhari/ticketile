/*
  Warnings:

  - You are about to drop the column `ownerEmail` on the `Theater` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Theater" DROP CONSTRAINT "Theater_ownerEmail_fkey";

-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "ownerEmail",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Theater" ADD CONSTRAINT "Theater_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
