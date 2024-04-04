/*
  Warnings:

  - You are about to drop the column `end` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "started" TIMESTAMP(3),
ADD COLUMN     "stoped" TIMESTAMP(3);
