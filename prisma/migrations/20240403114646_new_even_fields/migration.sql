/*
  Warnings:

  - Added the required column `currentTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currentTime" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isPaused" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isReset" BOOLEAN NOT NULL DEFAULT false;
