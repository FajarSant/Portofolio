/*
  Warnings:

  - You are about to drop the `Keahlian` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Proyek" ADD COLUMN     "thumbnail" TEXT;

-- DropTable
DROP TABLE "Keahlian";
