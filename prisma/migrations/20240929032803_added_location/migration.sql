/*
  Warnings:

  - You are about to drop the column `locatin` on the `Theater` table. All the data in the column will be lost.
  - Added the required column `location` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "locatin",
ADD COLUMN     "location" TEXT NOT NULL;
