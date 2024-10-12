/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Theater` table. All the data in the column will be lost.
  - Added the required column `ownerEmail` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Theater" DROP CONSTRAINT "Theater_ownerId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "showtime" DROP NOT NULL,
ALTER COLUMN "showtime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "ownerId",
ADD COLUMN     "ownerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Theater" ADD CONSTRAINT "Theater_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
