/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `showDate` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showtime` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "releaseDate",
ADD COLUMN     "showDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "showtime" TIMESTAMP(3) NOT NULL;
