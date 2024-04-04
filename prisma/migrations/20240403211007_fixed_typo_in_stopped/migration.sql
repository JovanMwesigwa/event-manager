/*
  Warnings:

  - You are about to drop the column `stoped` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "stoped",
ADD COLUMN     "stopped" TIMESTAMP(3);
