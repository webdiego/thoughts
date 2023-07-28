/*
  Warnings:

  - Made the column `place` on table `Thoughts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `feel` on table `Thoughts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Thoughts" ALTER COLUMN "place" SET NOT NULL,
ALTER COLUMN "feel" SET NOT NULL;
