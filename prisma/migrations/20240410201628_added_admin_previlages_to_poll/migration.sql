-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reavealed" BOOLEAN NOT NULL DEFAULT false;
