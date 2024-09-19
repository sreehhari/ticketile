/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `theaterId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Theater` table. All the data in the column will be lost.
  - You are about to drop the `TheaterOwner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locatin` to the `Theater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CONSUMER', 'THEATER_OWNER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CONSUMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_theaterId_fkey";

-- DropForeignKey
ALTER TABLE "Theater" DROP CONSTRAINT "Theater_ownerId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "theaterId";

-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "location",
ADD COLUMN     "locatin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CONSUMER';

-- DropTable
DROP TABLE "TheaterOwner";

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "theaterId" INTEGER NOT NULL,
    "showTimes" TEXT NOT NULL,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Theater" ADD CONSTRAINT "Theater_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheater" ADD CONSTRAINT "MovieTheater_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTheater" ADD CONSTRAINT "MovieTheater_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
