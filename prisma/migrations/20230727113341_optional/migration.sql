/*
  Warnings:

  - You are about to drop the column `thoughts` on the `Thoughts` table. All the data in the column will be lost.
  - Added the required column `thought` to the `Thoughts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thoughts" DROP COLUMN "thoughts",
ADD COLUMN     "thought" TEXT NOT NULL,
ALTER COLUMN "feel" DROP NOT NULL,
ALTER COLUMN "place" DROP NOT NULL;
