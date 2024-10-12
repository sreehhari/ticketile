/*
  Warnings:

  - Added the required column `showtime` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "showtime",
ADD COLUMN     "showtime" TIMESTAMP(3) NOT NULL;
