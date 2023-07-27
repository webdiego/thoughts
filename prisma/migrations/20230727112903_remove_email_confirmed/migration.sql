/*
  Warnings:

  - You are about to drop the column `post` on the `Thoughts` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - Added the required column `feel` to the `Thoughts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Thoughts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoughts` to the `Thoughts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thoughts" DROP COLUMN "post",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "feel" TEXT NOT NULL,
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "thoughts" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified";
