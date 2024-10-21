/*
  Warnings:

  - You are about to drop the column `showtime` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `showTimes` on the `MovieTheater` table. All the data in the column will be lost.
  - Added the required column `seatId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theaterId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "seatId" INTEGER NOT NULL,
ADD COLUMN     "theaterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "showtime";

-- AlterTable
ALTER TABLE "MovieTheater" DROP COLUMN "showTimes";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
